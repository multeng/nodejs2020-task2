const router = require('express').Router();
const Task = require('./tasks.model');
const tasksService = require('./tasks.service');

router.route('/:id/tasks').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.id);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  try {
    const task = await tasksService.get(req.params.boardId, req.params.taskId);
    res.json(Task.toResponse(task));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:id/tasks').post(async (req, res) => {
  try {
    const task = await tasksService.create(
      new Task({
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.params.id,
        columnId: req.body.columnId
      })
    );
    await res.json(Task.toResponse(task));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  try {
    await tasksService.del(req.params.boardId, req.params.taskId);
    res.status(200).send('OK');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  try {
    const task = await tasksService.update(
      req.params.boardId,
      req.params.taskId,
      {
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.body.boardId,
        columnId: req.body.columnId
      }
    );
    res.json(Task.toResponse(task));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
