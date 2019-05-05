const formTemplateController = require("../controllers/formTemplateController");
const Joi = require("joi");

function errorMessage(msg) {
  return {
    error: { details: [{ message: msg }] }
  };
}

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
    if (formTemplate.rulesFunction)
      try {
        formTemplateController.makeRuleFunction(formTemplate.rulesFunction);
      } catch (error) {
        return errorMessage("Error Parsing the Rules Function");
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
          "CURRENCY",
          "DROPLIST"
        ])
        .required(),
      isRequired: Joi.boolean(),
      isUnique: Joi.boolean(),
      minVal: Joi.number(),
      maxVal: Joi.number(),
      options: Joi.array()
    };

    let companyNameArabic = false;
    for (
      let i = 0;
      formTemplate.fields && i < formTemplate.fields.length;
      i++
    ) {
      let validation = Joi.validate(formTemplate.fields[i], fieldCreateSchema);
      if (validation.error) return validation;
      if (formTemplate.fields[i].fieldName === "companyNameArabic") {
        if (formTemplate.fields[i].fieldType !== "TEXT")
          return errorMessage(
            '"Company Name Arabic" field must be of type TEXT'
          );
        if (!formTemplate.fields[i].isRequired)
          return errorMessage(
            '"Company Name Arabic" field must be marked as Required'
          );
        if (!formTemplate.fields[i].isUnique)
          return errorMessage(
            '"Company Name Arabic" field must be marked as Unique'
          );
        if (!formTemplate.fields[i].minVal || formTemplate.fields[i].minVal < 3)
          return errorMessage(
            '"Company Name Arabic" field must have a minumum of three characters'
          );

        companyNameArabic = true;
      }
    }

    if (!companyNameArabic)
      return errorMessage(
        'Form Template must contain "Company Name Arabic" as a field'
      );

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
      return errorMessage("Error Parsing the Rules Function");
    }

    const fieldUpdateSchema = {
      fieldName: Joi.string().required(),
      fieldType: Joi.string()
        .valid([
          "TEXT",
          "NUMBER",
          "TEXT_NUMBER",
          "DATE",
          "GOVERNATE",
          "CITY",
          "CURRENCY",
          "DROPLIST"
        ])
        .required(),
      isRequired: Joi.boolean(),
      isUnique: Joi.boolean(),
      minVal: Joi.number(),
      maxVal: Joi.number(),
      options: Joi.array()
    };

    let companyNameArabic = false;
    for (
      let i = 0;
      formTemplate.fields && i < formTemplate.fields.length;
      i++
    ) {
      let validation = Joi.validate(formTemplate.fields[i], fieldUpdateSchema);
      if (validation.error) return validation;
      if (formTemplate.fields[i].fieldName === "companyNameArabic") {
        if (formTemplate.fields[i].fieldType !== "TEXT")
          return errorMessage(
            '"Company Name Arabic" field must be of type TEXT'
          );
        if (!formTemplate.fields[i].isRequired)
          return errorMessage(
            '"Company Name Arabic" field must be marked as Required'
          );
        if (!formTemplate.fields[i].isUnique)
          return errorMessage(
            '"Company Name Arabic" field must be marked as Unique'
          );
        if (!formTemplate.fields[i].minVal || formTemplate.fields[i].minVal < 3)
          return errorMessage(
            '"Company Name Arabic" field must have a minumum of three characters'
          );

        companyNameArabic = true;
      }
    }

    if (!companyNameArabic)
      return errorMessage(
        'Form Template must contain "Company Name Arabic" as a field'
      );
    return Joi.validate(formTemplate, formTemplateUpdateSchema);
  }
};
