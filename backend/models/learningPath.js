const mongoose = require('mongoose');

const learningPathSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  domain: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  courses: {
    type: String,
    ref: 'Course',
    required: true
  },
  duration: {
    type: Number, 
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

learningPathSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('LearningPath', learningPathSchema);
