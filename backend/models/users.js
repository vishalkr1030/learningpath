const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Users = new mongoose.Schema({
    id : {
        type: Number,
        required: true,
        unique: true,
        default: 1
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    }
});

Users.statics.getNextId = async function () {
    const lastUser = await this.findOne().sort({ id: -1 }).exec();
    return lastUser ? lastUser.id + 1 : 1;
};
  
  // Pre-save hook to set the id
Users.pre('save', async function (next) {
  if (this.isNew) {
    this.id = await this.constructor.getNextId();
  }
  next();
});

module.exports = mongoose.model('User', Users);