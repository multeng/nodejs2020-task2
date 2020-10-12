const DB = require('../../common/RESTDB');

const getAll = async () => DB.getAllUsers();

const get = async id => {
  const user = await DB.getUser(id);
  if (!user) {
    throw new Error(`User ${id} not found`);
  }
  return user;
};

const create = async user => DB.createUser(user);

const del = async id => DB.deleteUser(id);

const update = async user => DB.updateUser(user);

module.exports = { getAll, get, create, del, update };
