const jsonwebtoken = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { UNAUTHORIZED } = require('http-status-codes');

const checkAuth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const [tokenType, token] = authorizationHeader.split(' ');
    if (tokenType === 'Bearer') {
      jsonwebtoken.verify(token, JWT_SECRET_KEY);
      return next();
    }
    res.status(UNAUTHORIZED).send('UNAUTHORIZED');
  }
  res.status(UNAUTHORIZED).send('UNAUTHORIZED');
};

module.exports = checkAuth;
