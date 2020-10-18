const DB = require('../../common/RESTDB');
const TABLE = 'Users';

const getAll = async () => await DB.getAll(TABLE);

const get = async id => {
  const user = await DB.get(TABLE, { id });
  if (!user) {
    throw new Error(`User ${id} not found`);
  }
  return user;
};

const create = async user => await DB.create(TABLE, user);

const del = async id => {
  const isDeleted = await DB.del(TABLE, { id });
  if (!isDeleted) {
    throw new Error(`User ${id} not found for delete`);
  }
};

const update = async (id, user) => {
  const updatedUser = await DB.update(TABLE, { id }, user);
  if (!updatedUser) {
    throw new Error(`User ${id} did not updated`);
  }
  return updatedUser;
};

module.exports = { getAll, get, create, del, update };
