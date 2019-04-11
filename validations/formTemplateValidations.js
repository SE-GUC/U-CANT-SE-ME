const Joi = require("joi");

module.exports = {

  formTemplateCreateValidation: formTemplate => {
    const formTemplateCreateSchema = {

    };
    return Joi.validate(formTemplate, formTemplateCreateSchema);
  },

  formTemplateUpdateValidation: formTemplate => {
    const formTemplateUpdateSchema = {

    };
    return Joi.validate(formTemplate, formTemplateUpdateSchema);
  }

};
