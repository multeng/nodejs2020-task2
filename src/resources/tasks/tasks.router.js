const router = require('express').Router({ mergeParams: true });
const { OK, NOT_FOUND } = require('http-status-codes');
const Task = require('./tasks.model');
const tasksService = require('./tasks.service');
const validator = require('../../utils/validation/validator');
const schemas = require('../../utils/validation/schemas');

router.get('/', async (req, res) => {
  const tasks = await tasksService.getAll();
  await res.status(OK).json(tasks.map(Task.toResponse));
});

router.post('/', validator(schemas.task), async (req, res) => {
  const createdTask = await tasksService.create(
    new Task({
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.baseUrl.split('/')[2],
      columnId: req.body.columnId
    })
  );
  await res.status(OK).json(Task.toResponse(createdTask));
});

router.get('/:id', async (req, res) => {
  try {
    const task = await tasksService.get(req.params.id);
    await res.status(OK).json(Task.toResponse(task));
  } catch (error) {
    res.status(NOT_FOUND).send(error.message);
  }
});

router.put('/:id', validator(schemas.task), async (req, res) => {
  try {
    const updatedTask = {
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.body.boardId,
      columnId: req.body.columnId,
      id: req.params.id
    };
    const task = await tasksService.update(req.params.id, updatedTask);
    await res.status(OK).json(Task.toResponse(task));
  } catch (error) {
    res.status(NOT_FOUND).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  await tasksService.del(req.params.id);
  res.status(OK).send('OK');
});

module.exports = router;
