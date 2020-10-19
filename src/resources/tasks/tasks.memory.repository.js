const DB = require('../../common/RESTDB');
const TABLE = 'Tasks';

const getAll = async boardId => await DB.getAll(TABLE, { boardId });
const create = async task => await DB.create(TABLE, task);

const get = async (boardId, id) => {
  const task = await DB.get(TABLE, { boardId, id });
  if (!task) {
    throw new Error(`Task ${id} not found`);
  }
  return task;
};

const update = async (boardId, id, task) => {
  const updatedTask = await DB.update(TABLE, { boardId, id }, task);
  if (!updatedTask) {
    throw new Error(`Task ${id} was not update`);
  }
  return updatedTask;
};

const del = async id => {
  const isDeleted = await DB.del(TABLE, { id });
  if (!isDeleted) {
    throw new Error(`Task ${id} was not delete`);
  }
};

const delByField = async (field, value) =>
  await DB.delMany(TABLE, field, value);

const updateByField = async (field, id, value) =>
  await DB.updateMany(TABLE, field, id, value);

module.exports = {
  getAll,
  get,
  create,
  del,
  update,
  delByField,
  updateByField
};
