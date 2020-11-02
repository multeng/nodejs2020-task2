// const usersRepo = require('./user.memory.repository');
const usersRepo = require('./user.DB.repository');
const { deleteUser } = require('../tasks/tasks.DB.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = user => usersRepo.save(user);

const del = async id => {
  await deleteUser(id);
  await usersRepo.del(id);
};

const update = async (id, user) => await usersRepo.update(id, user);

const getByLogin = login => usersRepo.getByLogin(login);

module.exports = { getAll, get, create, del, update, getByLogin };
