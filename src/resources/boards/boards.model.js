const uuid = require('uuid');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Column = new mongoose.Schema({
  id: {
    type: String,
    default: uuid
  },
  title: String,
  order: Number
});

const Board = new Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: [Column]
  },
  { collection: 'boards' }
);

Board.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

module.exports = mongoose.model('boards', Board);
