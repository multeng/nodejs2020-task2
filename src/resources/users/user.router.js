const router = require('express').Router();
const { OK, NO_CONTENT } = require('http-status-codes');
const User = require('./user.model');
const usersService = require('./user.service');

router.get('/', async (req, res) => {
  const users = await usersService.getAll();
  await res.status(OK).json(users.map(User.toResponse));
});

router.post('/', async (req, res) => {
  const user = await usersService.create(req.body);
  res.status(OK).json(User.toResponse(user));
});

router.get('/:id', async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  const user = await usersService.update(req.params.id, req.body);
  await res.status(OK).json(User.toResponse(user));
});

router.delete('/:id', async (req, res) => {
  await usersService.del(req.params.id);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
