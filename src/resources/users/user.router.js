const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const user = new User(req.body);
  const createdUser = await usersService.create(user);
  res.json(User.toResponse(createdUser));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(req.params.id, req.body);
  await res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  await usersService.del(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
