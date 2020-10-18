const User = require('../resources/users/user.model');
const Board = require('../resources/boards/boards.model');
const Task = require('../resources/tasks/tasks.model');

const DB = {
  Users: [new User(), new User(), new User()],
  Boards: [new Board(), new Board(), new Board()],
  Tasks: [new Task(), new Task(), new Task()]
};

const getAll = (table, fields = {}) =>
  DB[table].filter(entity => isFieldsEquals(entity, fields));

const create = (table, entity) => {
  const currentTable = DB[table];
  currentTable.push(entity);
  return get(table, { id: entity.id });
};

const get = (table, fields) =>
  DB[table].find(entity => isFieldsEquals(entity, fields));

const update = (table, fields, data) => {
  const currentTable = DB[table];
  const idx = currentTable.findIndex(entity => isFieldsEquals(entity, fields));
  if (data && idx !== -1) {
    currentTable[idx] = { ...data, id: currentTable[idx].id };
    return get(table, { id: fields.id });
  }
};

const del = (table, fields) => {
  const currentTable = DB[table];
  const idx = currentTable.findIndex(entity => isFieldsEquals(entity, fields));
  if (idx !== -1) {
    currentTable.splice(idx, 1);
    return true;
  }
  return false;
};

const delMany = (table, key, value) => {
  DB[table] = DB[table].filter(entity => entity[key] !== value);
};

const updateMany = (table, key, oldValue, newValue) => {
  DB[table]
    .filter(entity => entity[key] === oldValue)
    .forEach(entity => (entity[key] = newValue));
};

const isFieldsEquals = (entity, fields) =>
  Object.keys(fields).every(key => fields[key] === entity[key]);

module.exports = {
  getAll,
  get,
  create,
  del,
  delMany,
  update,
  updateMany
};
