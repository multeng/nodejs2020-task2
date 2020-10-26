const router = require('express').Router();
const { OK, NO_CONTENT } = require('http-status-codes');
const Board = require('./boards.model');
const boardsService = require('./borads.service');

router.get('/', async (req, res) => {
  const boards = await boardsService.getAll();
  await res.status(OK).json(boards.map(Board.toResponse));
});

router.post('/', async (req, res) => {
  const board = await boardsService.create(req.body);
  res.status(OK).json(Board.toResponse(board));
});

router.get('/:id', async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.json(Board.toResponse(board));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  const board = await boardsService.update(req.params.id, req.body);
  await res.status(OK).json(Board.toResponse(board));
});

router.delete('/:id', async (req, res) => {
  await boardsService.del(req.params.id);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
