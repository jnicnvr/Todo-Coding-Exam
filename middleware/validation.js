const Joi = require("joi");
const resModel = require('../models/response.model')

module.exports = {
  validateTodo: (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string().min(10).required(),
      context: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ ...resModel.failModel, error: error.details[0].message });
    }
    next();
  },
  validateUpdateTodo: (req, res, next) => {
    const schema = Joi.object({
      id: Joi.string().required(),
      title: Joi.string().min(10).required(),
      context: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ ...resModel.failModel, error: error.details[0].message });
    }
    next();
  },
  validateDeleteTodo: (req, res, next) => {
    const schema = Joi.object({
      id: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ ...resModel.failModel, error: error.details[0].message });
    }
    next();
  },
};
