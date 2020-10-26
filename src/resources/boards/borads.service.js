const boardsRepo = require('./boards.DB.repository');
const { deleteTasksByBoard } = require('../tasks/tasks.DB.repository');

const getAll = () => boardsRepo.getAll();
const create = board => boardsRepo.save(board);
const get = id => boardsRepo.get(id);
const update = (id, board) => boardsRepo.update(id, board);
const del = async id => {
  await deleteTasksByBoard(id);
  await boardsRepo.del(id);
};

module.exports = { getAll, get, create, del, update };
