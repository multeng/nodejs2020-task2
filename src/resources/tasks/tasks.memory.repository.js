const DB = require('../../common/RESTDB');

const getAll = async boardId => DB.getAllTasks(boardId);

const get = async (boardId, taskId) => {
  const task = DB.getTask(boardId, taskId);
  if (!task) {
    throw new Error(`Task ${taskId} not found`);
  }
  return task;
};

const create = async task => DB.createTask(task);

const del = async (boardId, taskId) => DB.deleteTask(boardId, taskId);

const update = async (boardId, taskId, task) =>
  DB.updateTask(boardId, taskId, task);

module.exports = { getAll, get, create, del, update };
