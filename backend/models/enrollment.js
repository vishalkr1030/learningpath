const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    default: 1
  },
  user_id: {
    type: Number,
    required: true,
    ref: 'User'
  },
  course_id: {
    type: Number,
    required: true,
    ref: 'Course'
  },
  type: {
    type: String,
    default: "enrolled"
  },
  enrollment_date: {
    type: Date,
    required: true
  },
  completion_date: {
    type: Date,
    default: null
  }
});

enrollmentSchema.statics.getNextId = async function () {
  const lastUser = await this.findOne().sort({ id: -1 }).exec();
  return lastUser ? lastUser.id + 1 : 1;
};

enrollmentSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.id = await this.constructor.getNextId();
  }
  next();
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
