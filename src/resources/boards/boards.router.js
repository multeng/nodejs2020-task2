const router = require('express').Router();
const Board = require('./boards.model');
const boradsService = require('./borads.service');
const boardsService = require('./borads.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.json(Board.toResponse(board));
  } catch (error) {
    res.sendStatus(404).send(error.message);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boradsService.create(
    new Board({
      title: req.body.title,
      columns: req.body.columns
    })
  );
  res.json(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardsService.del(req.params.id);
    res.status(200).send('OK');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update({
    id: req.params.id,
    title: req.body.title,
    columns: req.body.columns
  });
  res.json(Board.toResponse(board));
});

module.exports = router;
