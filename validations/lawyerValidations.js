const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      fullName: Joi.string()
        .min(3)
        .required(),
      email: Joi.string().required(),
      username: Joi.string()
        .min(3)
        .required(),
      password: Joi.string()
        .min(8)
        .required()
    };
    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      fullName: Joi.string().min(3),
      email: Joi.string(),
      username: Joi.string().min(3),
      password: Joi.string().min(8)
    };

    return Joi.validate(request, updateSchema);
  }
};
