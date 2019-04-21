const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      socialInsuranceNumber: Joi.string()
        .min(3)
        .trim()
        .regex(/^\d+$/)
        .required(),
      investorId: Joi.required(), //has to be changed
      companyType: Joi.string()
        .min(3)
        .required(),
      dateOfCreation: Joi.date(),
      companyNameArabic: Joi.string()
        .min(3)
        .required(),
      companyNameEnglish: Joi.string().min(3),
      caseId: Joi.required(),
      description: Joi.string().min(5)
    };
    return Joi.validate(request, createSchema);
  },

  updateValidationBody: request => {
    const updateSchemaBody = {
      companyNameArabic: Joi.string().min(3)
    };
    return Joi.validate(request, updateSchemaBody);
  }
};
