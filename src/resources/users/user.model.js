const uuid = require('uuid');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { collection: 'users' }
);

User.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

module.exports = mongoose.model('users', User);
