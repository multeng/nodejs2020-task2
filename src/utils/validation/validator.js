const { BAD_REQUEST } = require('http-status-codes');
const logger = require('../../common/logger');

const errorResponse = schemaErrors => ({
  status: 'failed',
  errors: schemaErrors.map(err => ({
    path: err.path,
    message: err.message
  }))
});

const validator = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true
    });

    if (error) {
      logger.error(error.message);
      res.status(BAD_REQUEST).json(errorResponse(error.details));
    } else {
      return next();
    }
  };
};

module.exports = validator;
