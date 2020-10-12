const User = require('../resources/users/user.model');
const Board = require('../resources/boards/boards.model');

const UsersDB = [];
const BoardsDB = [];

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
  updateBoard
};
