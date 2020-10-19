const router = require('express').Router();
const Board = require('./boards.model');
const boardsService = require('./borads.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/').post(async (req, res) => {
  const board = new Board(req.body);
  const createdBoard = await boardsService.create(board);
  res.json(createdBoard);
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.json(board);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(req.params.id, req.body);
  res.json(board);
});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardsService.del(req.params.id);
    res.status(204).send('OK');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
