const tasksRepo = require('./tasks.DB.repository');

const getAll = () => tasksRepo.getAll();

const get = id => tasksRepo.get(id);

const create = task => tasksRepo.save(task);

const update = (id, task) => tasksRepo.update(id, task);

const del = id => tasksRepo.del(id);

module.exports = { getAll, get, create, del, update };
