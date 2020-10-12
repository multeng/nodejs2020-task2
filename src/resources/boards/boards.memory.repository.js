const DB = require('../../common/RESTDB');

const getAll = async () => DB.getAllBoards();

const get = async id => {
  const board = await DB.getBoard(id);
  if (!board) {
    throw new Error(`Board ${id} not found`);
  }
  return board;
};

const create = async board => DB.createBoard(board);

const del = async id => DB.deleteBoard(id);

const update = async board => DB.updateBoard(board);

module.exports = { getAll, get, create, del, update };
