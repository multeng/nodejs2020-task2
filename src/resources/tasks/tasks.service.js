const tasksRepo = require('./tasks.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);

const create = task => tasksRepo.create(task);

const del = (boardId, taskId) => tasksRepo.del(boardId, taskId);

const update = (boardId, taskId, task) =>
  tasksRepo.update(boardId, taskId, task);

module.exports = { getAll, get, create, del, update };
