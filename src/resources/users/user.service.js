const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = user => usersRepo.create(user);

const del = id => usersRepo.del(id);

const update = user => usersRepo.update(user);

module.exports = { getAll, get, create, del, update };
