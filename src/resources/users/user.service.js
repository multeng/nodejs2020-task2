const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/tasks.service');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = user => usersRepo.create(user);

const del = async id => {
  await usersRepo.del(id);
  await tasksService.updateByUser(id, null);
};

const update = (id, user) => usersRepo.update(id, user);

module.exports = { getAll, get, create, del, update };
