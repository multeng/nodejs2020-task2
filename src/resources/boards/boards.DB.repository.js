const Board = require('./boards.model');

const getAll = async () => Board.find({});

const save = async board => {
  return Board.create(board);
};

const get = async id => {
  return Board.findById(id);
};

const del = async id => Board.deleteOne({ _id: id });

const update = async (id, board) => Board.updateOne({ _id: id }, board);

module.exports = { getAll, save, get, del, update };
