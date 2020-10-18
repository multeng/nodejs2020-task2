const tasksRepo = require('./tasks.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const get = (boardId, id) => tasksRepo.get(boardId, id);

const create = task => tasksRepo.create(task);

const update = (boardId, id, task) => tasksRepo.update(boardId, id, task);

const del = id => tasksRepo.del(id);

const delByBoard = id => tasksRepo.delByField('boardId', id);

const updateByUser = (id, value) =>
  tasksRepo.updateByField('userId', id, value);

module.exports = { getAll, get, create, del, update, delByBoard, updateByUser };
