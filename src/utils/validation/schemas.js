const Joi = require('joi');

const schemas = {
  user: Joi.object().keys({
    name: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@$!%*?&])[A-Za-z\d_@$!%*?&]{8,}$/
      )
      .required()
  }),
  board: Joi.object().keys({
    title: Joi.string().required(),
    columns: Joi.array()
  }),
  task: Joi.object().keys({
    title: Joi.string().required(),
    order: Joi.number(),
    description: Joi.string()
  })
};

module.exports = schemas;
