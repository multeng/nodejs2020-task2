const boardsRepo = require('./boards.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = board => boardsRepo.create(board);

const del = id => boardsRepo.del(id);

const update = board => boardsRepo.update(board);

module.exports = { getAll, get, create, del, update };
