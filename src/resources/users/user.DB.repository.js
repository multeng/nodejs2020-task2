const User = require('./user.model');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { SALT_ROUNDS, JWT_SECRET_KEY } = require('../../common/config');

const getAll = async () => User.find({});

const save = async user => {
  const { password } = user;
  const salt = await bcrypt.genSalt(+SALT_ROUNDS);
  const encryptedPassword = await bcrypt.hash(password, salt);
  return User.create({ ...user, password: encryptedPassword });
};

const get = async id => {
  return User.findById(id);
};

const getByLogin = async data => {
  const user = await User.findOne({ login: data.login });
  if (!user) throw new Error();
  if (await bcrypt.compare(data.password, user.password)) {
    const token = await jsonwebtoken.sign(
      { userId: user._id, login: user.login },
      JWT_SECRET_KEY
    );
    return { token };
  }
  throw new Error('Incorrect data!');
};

const del = async id => User.deleteOne({ _id: id });

const update = async (id, user) => {
  const { password } = user;
  const salt = await bcrypt.genSalt(+SALT_ROUNDS);
  const encryptedPassword = await bcrypt.hash(password, salt);
  const newUser = User.updateOne(
    { _id: id },
    { ...user, password: encryptedPassword }
  );
  return newUser;
};

module.exports = { getAll, save, get, del, update, getByLogin };
