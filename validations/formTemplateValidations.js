const formTemplateController = require("../controllers/formTemplateController");
const Joi = require("joi");

module.exports = {
  formTemplateCreateValidation: formTemplate => {
    const formTemplateCreateSchema = {
      formName: Joi.string().required(),
      fields: Joi.array()
        .min(2)
        .required(),
      hasManagers: Joi.boolean().required(),
      rulesFunction: Joi.string()
    };

    try {
        formTemplateController.makeRuleFunction(formTemplate.rulesFunction);
    } catch (error) {
      return {
        error: { details: [{ message: "Error Parsing the Rules Function" }] }
      };
    }

    const fieldCreateSchema = {
      fieldName: Joi.string().required(),
      fieldType: Joi.string()
        .valid([
          "TEXT",
          "NUMBER",
          "TEXT_NUMBER",
          "DATE",
          "GOVERNATE",
          "CITY",
          "CURRENCY"
        ])
        .required(),
      isRequired: Joi.boolean(),
      isUnique: Joi.boolean(),
      minVal: Joi.number(),
      maxVal: Joi.number()
    };

    for (
      let i = 0;
      formTemplate.fields && i < formTemplate.fields.length;
      i++
    ) {
      let validation = Joi.validate(formTemplate.fields[i], fieldCreateSchema);
      if (validation.error) return validation;
    }

    return Joi.validate(formTemplate, formTemplateCreateSchema);
  },

  formTemplateUpdateValidation: formTemplate => {
    const formTemplateUpdateSchema = {
      formName: Joi.string(),
      fields: Joi.array().min(2),
      hasManagers: Joi.boolean(),
      rulesFunction: Joi.string()
    };

    try {
        formTemplateController.makeRuleFunction(formTemplate.rulesFunction);
    } catch (error) {
      return {
        error: { details: [{ message: "Error Parsing the Rules Function" }] }
      };
    }

    const fieldUpdateSchema = {
      fieldName: Joi.string(),
      fieldType: Joi.string().valid([
        "TEXT",
        "NUMBER",
        "TEXT_NUMBER",
        "DATE",
        "GOVERNATE",
        "CITY",
        "CURRENCY"
      ]),
      isRequired: Joi.boolean(),
      isUnique: Joi.boolean(),
      minVal: Joi.number(),
      maxVal: Joi.number()
    };

    for (
      let i = 0;
      formTemplate.fields && i < formTemplate.fields.length;
      i++
    ) {
      let validation = Joi.validate(formTemplate.fields[i], fieldUpdateSchema);
      if (validation.error) return validation;
    }

    return Joi.validate(formTemplate, formTemplateUpdateSchema);
  }
};
