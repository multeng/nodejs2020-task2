const router = require('express').Router();
const { OK, NO_CONTENT, NOT_FOUND } = require('http-status-codes');
const User = require('./user.model');
const usersService = require('./user.service');
const validator = require('../../utils/validation/validator');
const schemas = require('../../utils/validation/schemas');

router.get('/', async (req, res) => {
  const users = await usersService.getAll();
  await res.status(OK).json(users.map(User.toResponse));
});

router.post('/', validator(schemas.user), async (req, res) => {
  const user = await usersService.create(req.body);
  res.status(OK).json(User.toResponse(user));
});

router.get('/:id', async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  } catch (error) {
    res.status(NOT_FOUND).send(error.message);
  }
});

router.put('/:id', validator(schemas.user), async (req, res) => {
  try {
    const user = await usersService.update(req.params.id, req.body);
    await res.status(OK).json(User.toResponse(user));
  } catch (error) {
    res.status(NOT_FOUND).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  await usersService.del(req.params.id);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
