const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
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
  rating: {
    type: Number,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  modules: {
    type: []
  }
});

module.exports = mongoose.model('Course', courseSchema);
