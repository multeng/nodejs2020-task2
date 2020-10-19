const router = require('express').Router();
const Task = require('./tasks.model');
const tasksService = require('./tasks.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks);
});

router.route('/:boardId/tasks').post(async (req, res) => {
  try {
    const task = new Task({ ...req.body, boardId: req.params.boardId });
    const createdTask = await tasksService.create(task);
    res.json(createdTask);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:boardId/tasks/:id').get(async (req, res) => {
  try {
    const task = await tasksService.get(req.params.boardId, req.params.id);
    res.json(task);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:boardId/tasks/:id').put(async (req, res) => {
  try {
    const task = await tasksService.update(
      req.params.boardId,
      req.params.id,
      req.body
    );
    res.json(task);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:boardId/tasks/:id').delete(async (req, res) => {
  try {
    await tasksService.del(req.params.id);
    res.status(200).send('OK');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
