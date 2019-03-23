const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      fullName: Joi.string()
        .min(10)
        .required(),
      email: Joi.string().required(),
      username: Joi.string()
        .min(4)
        .required(),
      password: Joi.string()
        .min(4)
        .required()
    };

    return Joi.validate(request, createSchema);
  },
  updateValidation: request => {
    const updateSchema = {
      fullName: Joi.string().min(10),
      email: Joi.string(),
      username: Joi.string().min(4),
      password: Joi.string().min(4)
    };

    return Joi.validate(request, updateSchema);
  }
};
