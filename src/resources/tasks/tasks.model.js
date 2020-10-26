const uuid = require('uuid');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Task = new Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    order: Number,
    userId: String,
    description: String,
    boardId: String,
    columnId: String
  },
  { collection: 'tasks' }
);

Task.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

module.exports = mongoose.model('tasks', Task);
