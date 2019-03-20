const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const now = Date.now();
    const earliestBirthDate = new Date(now - 21 * 365 * 24 * 60 * 60 * 1000); //21 years earlier

    const createSchema = {
      email: Joi.string()
        .email()
        .lowercase()
        .required(),
      password: Joi.string()
        .min(8)
        .required(),
      fullName: Joi.string()
        .min(3)
        .required(),
      type: Joi.string().required(), //Input will come from a list. No need for: Joi.any().valid(['a', 'b', 'c']).required()
      gender: Joi.string().required(), //Input will come from a list. No need for: Joi.any().valid(['M', 'F']).required()
      nationality: Joi.string().required(), //Input will come from a list
      methodOfIdentification: Joi.string().required(), //Input will come from a list
      identificationNumber: Joi.string().required(),
      dateOfBirth: Joi.date()
        .max(earliestBirthDate)
        .required(),
      residenceAddress: Joi.string().required(),
      telephoneNumber: Joi.string(),
      fax: Joi.string()
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const now = Date.now();
    const earliestBirthDate = new Date(now - 21 * 365 * 24 * 60 * 60 * 1000); //21 years earlier
    
    const updateSchema = {
      email: Joi.string()
        .email()
        .lowercase(),
      password: Joi.string().min(8),
      fullName: Joi.string().min(3),
      type: Joi.string(), //Input will come from a list. No need for: Joi.any().valid(['a', 'b', 'c']).required()
      gender: Joi.string(), //Input will come from a list. No need for: Joi.any().valid(['M', 'F']).required()
      nationality: Joi.string(), //Input will come from a list
      methodOfIdentification: Joi.string(), //Input will come from a list
      identificationNumber: Joi.string(),
      dateOfBirth: Joi.date().max(earliestBirthDate),
      residenceAddress: Joi.string(),
      telephoneNumber: Joi.string(),
      fax: Joi.string()
    };

    return Joi.validate(request, updateSchema);
  }
};
