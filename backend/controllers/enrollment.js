const enrollment = require('../models/enrollment');
const Performance = require('../models/performance');
const User = require('../models/users');
const Course = require('../models/course');

exports.assignCourse = async (req, res) => {
    const userId = parseInt(req.body.userId, 10);
    const courseId = parseInt(req.body.courseId, 10);

    if (!userId || !courseId) {
        return res.status(400).json({ message: 'User ID and Course ID are required.' });
    }

    try {
        const newEnrollment = new enrollment({
            user_id : userId,
            course_id: courseId,
            type: 'assigned', 
            enrollment_date: new Date() 
        });

        await newEnrollment.save();

        return res.status(201).json({ message: 'Course assigned successfully', enrollment: newEnrollment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

exports.enrollCourse = async (req, res) => {
    const userId = parseInt(req.body.userId, 10);
    const courseId = parseInt(req.body.courseId, 10);
    // console.log(userId);

    if (!userId || !courseId) {
        return res.status(400).json({ message: 'User ID and Course ID are required.' });
    }

    try {
        const newEnrollment = new enrollment({
            user_id : userId,
            course_id: courseId,
            enrollment_date: new Date(),
        });
        // console.log(newEnrollment);
        await newEnrollment.save();

        return res.status(201).json({ message: 'successfully enrolled in selected Course', enrollment: newEnrollment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

exports.getEmployeeProgress = async (req, res) => {
    // console.log(req.body);
    try {
        const userId = parseInt(req.body.userId, 10);
        const enrollments = await enrollment.find({ user_id: userId });
        // console.log(enrollments);
        let completedCourses = 0;
        let inProgressCourses = 0;
        const totalCourses = enrollments.length;

        // Calculate course progress
        for (const enrollment of enrollments) {
            const performance = await Performance.findOne({ enrollment_id: enrollment.id });
            if (performance) {
                if (performance.progress === 100) {
                    completedCourses += 1;
                } else if (performance.progress > 0) {
                    inProgressCourses += 1;
                }
            }
        }

        const progressData = {
            completedCourses,
            inProgressCourses,
            totalCourses,
        };
        // console.log(progressData);
        res.status(200).json(progressData);
    } catch (error) {
        console.error('Error fetching employee progress:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getEnrollments = async (req, res) => {
    try {
        const enrollments = await enrollment.find();

        // Fetch related user and course data
        const userIds = enrollments.map(e => e.user_id);
        const courseIds = enrollments.map(e => e.course_id);

        const users = await User.find({ id: { $in: userIds } });
        const courses = await Course.find({ id: { $in: courseIds } });

        // Map users and courses by their ids for easy lookup
        const userMap = {};
        users.forEach(user => {
            userMap[user.id] = user;
        });

        const courseMap = {};
        courses.forEach(course => {
            courseMap[course.id] = course;
        });

        // Attach user and course details to enrollments
        const enrichedEnrollments = enrollments.map(enrollment => ({
            ...enrollment._doc,
            user: userMap[enrollment.user_id],
            course: courseMap[enrollment.course_id],
        }));

        return res.status(200).json(enrichedEnrollments);
    } catch (error) {
        console.error('Error fetching enrollments:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.completionRate = async (req, res) => {
    const userId = parseInt(req.body.userId, 10);
    try {
        const enrollments = await enrollment.find({user_id : userId});

        const totalEnrollments = enrollments.length;

        const completions = await Performance.find({ 
            user_id : userId,
            certificate_earned: true 
        });

        const totalCompletions = completions.length;

        const completionRate = totalEnrollments ? (totalCompletions / totalEnrollments) * 100 : 0;

        return res.status(200).json({ completionRate });
    } catch (error) {
        console.error('Error fetching completion rate:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getUserCourses = async(req, res) => {
    const userId  = parseInt(req.body.userId, 10);
    try {
        const enrollments = await enrollment.find({user_id : userId});
        res.status(200).send(enrollments);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
// Controller function to get user courses
exports.getUserCoursesType = async (req, res) => {
  try {
    const userId  = parseInt(req.body.userId, 10);
    const courseId  = parseInt(req.body.id, 10);

    const enrollments = await enrollment.findOne({ user_id : userId, course_id: courseId });

    if (!enrollments) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    // console.log(enrollments)
    const courseType = enrollments ? enrollments.type : null;

    res.status(200).json({
      type: courseType, // Assuming `type` is a property in your Course model
      enrollment,
    });
  } catch (error) {
    console.error('Error fetching user courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


