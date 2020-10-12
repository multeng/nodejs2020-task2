const User = require('../resources/users/user.model');
const Board = require('../resources/boards/boards.model');

const UsersDB = [];
const BoardsDB = [];
let TasksDB = [];

UsersDB.push(new User(), new User(), new User());
BoardsDB.push(new Board(), new Board(), new Board());

// users

const getAllUsers = async () => {
  return UsersDB.slice(0);
};

const getUser = async id => UsersDB.filter(el => el.id === id)[0];

const createUser = async user => {
  UsersDB.push(user);
  return getUser(user.id);
};

const deleteUser = async id => {
  const idx = UsersDB.findIndex(el => el.id === id);
  if (idx !== -1) {
    UsersDB.splice(idx, 1);
  }
  TasksDB.map(el => {
    if (el.userId === id) el.userId = null;
  });
};

const updateUser = async user => {
  const idx = UsersDB.findIndex(el => el.id === user.id);
  if (idx === -1) {
    throw new Error('User not found');
  } else {
    UsersDB[idx] = new User(user);
    return UsersDB[idx];
  }
};

// boards

const getAllBoards = () => {
  return BoardsDB.slice(0);
};

const getBoard = async id => BoardsDB.filter(el => el.id === id)[0];

const createBoard = async board => {
  BoardsDB.push(board);
  return getBoard(board.id);
};

const deleteBoard = async id => {
  const idx = BoardsDB.findIndex(el => el.id === id);
  if (idx !== -1) {
    BoardsDB.splice(idx, 1);
  }
  TasksDB = TasksDB.filter(el => el.boardId !== id);
};

const updateBoard = async board => {
  const idx = BoardsDB.findIndex(el => el.id === board.id);
  if (idx === -1) {
    throw new Error('Board not found');
  } else {
    BoardsDB[idx] = new Board(board);
    return BoardsDB[idx];
  }
};

// tasks

const getAllTasks = async id => TasksDB.filter(el => el.boardId === id);

const getTask = async (boardId, taskId) =>
  TasksDB.slice().filter(el => el.id === taskId && el.boardId === boardId)[0];

const createTask = async task => {
  TasksDB.push(task);
  return getTask(task.id);
};

const deleteTask = async (boardId, taskId) => {
  const onBoard = BoardsDB.some(el => el.id === boardId);
  if (!onBoard) {
    throw new Error('Board not found');
  }
  const idx = TasksDB.findIndex(el => el.id === taskId);
  if (idx === -1) {
    throw new Error('Tasks not found');
  } else {
    TasksDB.splice(idx, 1);
    return;
  }
};

const updateTask = async (boardId, taskId, task) => {
  const onBoard = BoardsDB.some(el => el.id === boardId);
  if (!onBoard) {
    throw new Error('Board not found');
  }
  const idx = TasksDB.findIndex(el => el.id === taskId);
  if (idx === -1) {
    throw new Error('Tasks not found');
  } else {
    TasksDB[idx] = { id: taskId, ...task };
    return TasksDB[idx];
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  getAllBoards,
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard,
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
};
