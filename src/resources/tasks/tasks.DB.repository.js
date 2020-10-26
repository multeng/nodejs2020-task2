const Task = require('./tasks.model');

const getAll = async () => Task.find({});

const save = task => Task.create(task);

const get = id => Task.findById(id);

const del = id => Task.deleteOne({ _id: id });

const update = (id, task) => Task.updateOne({ _id: id }, task);

const deleteTasksByBoard = async id => Task.deleteMany({ boardId: id });

const deleteUser = async id => {
  await Task.updateMany({ userId: id }, { userId: null });
};

module.exports = {
  getAll,
  save,
  get,
  del,
  update,
  deleteTasksByBoard,
  deleteUser
};
