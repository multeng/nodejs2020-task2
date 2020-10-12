const User = require('../resources/users/user.model');
const DB = [];

DB.push(new User(), new User(), new User());

const getAllUsers = async () => {
  return DB.slice(0);
};

const getUser = async id => DB.filter(el => el.id === id)[0];

const createUser = async user => {
  DB.push(user);
  return getUser(user.id);
};

const deleteUser = async id => {
  const idx = DB.findIndex(el => el.id === id);
  if (idx !== -1) {
    DB.splice(idx, 1);
  }
};

const updateUser = async user => {
  const idx = DB.findIndex(el => el.id === user.id);
  if (idx === -1) {
    throw new Error('User not found');
  } else {
    DB[idx] = new User(user);
    return DB[idx];
  }
};

module.exports = { getAllUsers, getUser, createUser, deleteUser, updateUser };
