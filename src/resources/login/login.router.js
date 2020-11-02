const router = require('express').Router();
const userService = require('../users/user.service');

router.post('/', async (req, res) => {
  const token = await userService.getByLogin(req.body);
  res.json(token);
});
module.exports = router;
