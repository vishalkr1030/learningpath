const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  user_id: {
    type: Number,
    required: true,
    ref: 'User',
  },
  enrollment_id: {
    type: Number,
    required: true,
    ref: 'Enrollment',
  },
  score: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    required: true, 
  },
  progress: {
    type: Number,
    required: true, 
  },
  certificate_earned: {
    type: Boolean,
    default: false, 
  },
});

module.exports = mongoose.model('Performance', performanceSchema);
