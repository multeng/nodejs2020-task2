const boardsRepo = require('./boards.memory.repository');
const tasksService = require('../tasks/tasks.service');

const getAll = () => boardsRepo.getAll();
const create = board => boardsRepo.create(board);
const get = id => boardsRepo.get(id);
const update = (id, board) => boardsRepo.update(id, board);
const del = async id => {
  await boardsRepo.del(id);
  await tasksService.delByBoard(id);
};

module.exports = { getAll, get, create, del, update };
