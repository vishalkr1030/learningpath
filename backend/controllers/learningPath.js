const LearningPath = require('../models/learningPath');
const Course = require('../models/course');

exports.getLearningPaths = async (req, res) => {
  try {
    const learningPaths = await LearningPath.find();

    const learningPathDetails = await Promise.all(learningPaths.map(async (path) => {
      const courseIds = path.courses.split(',').map(Number);
      const coursestitle = await Course.find({ id: { $in: courseIds } });
      const names = coursestitle.map(course => course.title);
      // console.log(names);
      return {
        id: path.id,
        domain: path.domain,
        title: path.title,
        description: path.description,
        courses: path.courses,
        coursestitle: names,
        duration: path.duration,
        difficulty: path.difficulty,
        created_at: path.created_at,
        updated_at: path.updated_at
      };
    }));

    res.status(200).json(learningPathDetails);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching learning paths', error: err.message });
  }
};

exports.addLearningPath = async (req, res) => {
  const { domain, title, description, courses, duration, difficulty, created_at, updated_at } = req.body;
  
  if (!courses || !Array.isArray(courses) || courses.length === 0) {
    return res.status(400).json({ message: 'Courses field must be a non-empty array' });
  }

  try {
    // Create a new learning path instance
    const newLearningPath = new LearningPath({
      domain,
      title,
      description,
      courses,
      duration,
      difficulty,
      created_at: created_at || new Date(),
      updated_at: updated_at || new Date()
    });

    // Save the learning path to the database
    const savedLearningPath = await newLearningPath.save();
    res.status(201).json(savedLearningPath);  // Respond with the created path
  } catch (err) {
    res.status(500).json({ message: 'Error adding learning path', error: err.message });
  }
};
