const schemaPerformance = require('../models/performance');
const enrollmentSchema = require('../models/enrollment');
const courseSchema = require('../models/course');

exports.getCertificates = async (req, res) => {
    const userId = parseInt(req.body.userId, 10);
    // console.log(userId);
    try {
        const performanceRecords = await schemaPerformance.find({
            user_id: userId
        });
        // console.log(performanceRecords);
        
        if (performanceRecords.length === 0) {
            return res.status(200).send([]);
        }

        const certificatePromises = performanceRecords.map(async (record) => {
            const enrollmentData = await enrollmentSchema.findOne({ id: record.enrollment_id });
            const courseData = await courseSchema.findOne({ id: enrollmentData.course_id });

            return {
                ...record.toObject(),
                enrollmentDate: enrollmentData?.enrollment_date || null,
                completionDate: enrollmentData?.completion_date || null,
                courseName: courseData ? courseData.title : null
            };
        });

        const certificatesWithDetails = await Promise.all(certificatePromises);
        // console.log(certificatesWithDetails);
        res.status(200).send(certificatesWithDetails);
    } catch (error) {
        console.error("Error fetching certificates:", error);
        res.status(500).send({ message: "Failed to fetch certificates.", error: error.message });
    }
};


exports.submitScore = async (req, res) => {
    try {
      const { userId, enrollmentId, score } = req.body;
      const grade = score > 12 ? 'A' : (score > 10 ? 'B' : score > 7 ? 'C' : 'D');
      const performance = new schemaPerformance({
        userId,
        enrollmentId,
        grade,
        score,
      });
      await performance.save();
  
      return res.status(200).json({ message: "Score submitted successfully." });
    } catch (error) {
      console.error("Error submitting score:", error);
      return res.status(500).json({ message: "Failed to submit score." });
    }
};

exports.updateCertificateStatus = async (req, res) => {
    const { userId, enrollmentId, status } = req.body;
  
    try {
      const performance = await Performance.findOne({
        userId: userId,
        enrollmentId: enrollmentId,
      });
  
      if (!performance) {
        return res.status(404).json({ message: 'Performance record not found.' });
      }
  
      performance.certificateEarned = status;
  
      await performance.save();
  
      return res.status(200).json({ message: 'Certificate status updated successfully.' });
    } catch (error) {
      console.error('Error updating certificate status:', error);
      return res.status(500).json({ message: 'Failed to update certificate status.' });
    }
};
  