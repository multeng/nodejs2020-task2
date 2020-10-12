const DB = require('../../common/RESTDB');

const getAll = async () => DB.getAllBoards();

const get = async id => {
  const user = await DB.getBoard(id);
  if (!user) {
    throw new Error(`User ${id} not found`);
  }
  return user;
};

const create = async board => DB.createBoard(board);

const del = async id => DB.deleteBoard(id);

const update = async board => DB.updateBoard(board);

module.exports = { getAll, get, create, del, update };
