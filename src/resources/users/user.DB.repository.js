const User = require('./user.model');
// const TABLE = 'Users';

const getAll = async () => User.find({});

const save = async user => {
  return User.create(user);
};
const get = async id => {
  return User.findById(id);
};

const del = async id => User.deleteOne({ _id: id });

const update = async (id, user) => User.updateOne({ _id: id }, user);

module.exports = { getAll, save, get, del, update };
