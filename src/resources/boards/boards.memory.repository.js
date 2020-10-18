const DB = require('../../common/RESTDB');
const TABLE = 'Boards';

const getAll = async () => await DB.getAll(TABLE);

const get = async id => {
  const board = await DB.get(TABLE, { id });
  if (!board) {
    throw new Error(`Board ${id} not found`);
  }
  return board;
};

const create = async board => await DB.create(TABLE, board);

const update = async (id, board) => {
  const updatedBoard = await DB.update(TABLE, { id }, board);
  if (!updatedBoard) {
    throw new Error(`Board ${id} did not updated`);
  }
  return updatedBoard;
};

const del = async id => {
  const isDeleted = await DB.del(TABLE, { id });
  if (!isDeleted) {
    throw new Error(`Board ${id} not found for delete`);
  }
};

module.exports = { getAll, get, create, del, update };
