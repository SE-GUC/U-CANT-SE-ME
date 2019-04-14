// Dependencies
const mongoose = require("mongoose");
const Joi = require("joi");
const validator = require("../validations/formTemplateValidations");
const mongoValidator = require("validator");

const FormTemplate = require("../models/FormTemplate");
const Case = require("../models/dCase");

//Get all FormTemplate
exports.getAllFormTemplates = async function(req, res) {
  const formTemplates = await FormTemplate.find();
  res.send({ msg: "Form Templates successfully loaded!", data: formTemplates });
};

//Get a FormTemplate with a specific ID (get certain FormTemplate)
exports.getFormTemplate = async function(req, res) {
  if (!mongoValidator.isMongoId(req.params.id))
    return res.status(400).send({ error: "Invalid ID format!" });
  const formTemplate = await FormTemplate.findById(req.params.id);
  if (!formTemplate)
    return res
      .status(404)
      .send({ error: "The given form template is not found!" });
  res.send({ msg: "Form Template successfully loaded!", data: formTemplate });
};

//Create a FormTemplate
exports.createFormTemplate = async function(req, res) {
  const { error } = validator.formTemplateCreateValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const newFormTemplate = await FormTemplate.create(req.body);
    res.send({
      msg: "Form Template successfully Created!",
      data: newFormTemplate
    });
  } catch (error) {
    res.status(400).send({ error: "Form Template name already exists" });
  }
};

//Update a FormTemplate
exports.updateFormTemplate = async function(req, res) {
  if (!mongoValidator.isMongoId(req.params.id))
    return res.status(400).send({ error: "Invalid ID format!" });
  const formTemplate = await FormTemplate.findById(req.params.id);

  if (!formTemplate)
    return res
      .status(404)
      .send({ error: "The given form template is not found!" });

  if (!req.body.formName) req.body.formName = formTemplate.formName;
  if (!req.body.hasManagers) req.body.hasManagers = formTemplate.hasManagers;
  if (!req.body.rulesFunction && formTemplate.rulesFunction)
    req.body.rulesFunction = formTemplate.rulesFunction;

  const { error } = validator.formTemplateUpdateValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await FormTemplate.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      msg: "Form Template successfully Updated!",
      data: await FormTemplate.findById(req.params.id)
    });
  } catch (error) {
    res.status(400).send({ error: "Form Template name already exists" });
  }
};

//Delete a FormTemplate
exports.deleteFormTemplate = async function(req, res) {
  if (!mongoValidator.isMongoId(req.params.id))
    return res.status(400).send({ error: "Invalid ID format!" });
  const formTemplate = await FormTemplate.findByIdAndRemove(req.params.id);
  if (!formTemplate)
    return res
      .status(404)
      .send({ error: "The given form template is not found!" });
  res.send({ msg: "Form Template successfully deleted!", data: formTemplate });
};

//make an an instance of the ruleFunction
function makeRuleFunction(rulesFunction) {
  let wrapper =
    "function (investor, form, managers = []) { " + rulesFunction + " } ";
  return new Function("return " + wrapper);
}

function errorMessage(msg) {
  return {
    error: {
      details: [
        {
          message: msg
        }
      ]
    }
  };
}

function validateField(fieldValue, field) {
  let fieldType = field.fieldType,
    fieldSchema = {},
    minVal,
    maxVal,
    found = false;
  switch (fieldType) {
    case "TEXT":
      minVal = field.minVal ? field.minVal : 1;
      maxVal = field.maxVal ? field.maxVal : 1000;
      fieldSchema = {
        field: Joi.string()
          .min(minVal)
          .max(maxVal)
      };
      break;
    case "NUMBER":
      minVal = field.minVal ? field.minVal : 0;
      maxVal = field.maxVal ? field.maxVal : 1000000000;
      fieldSchema = {
        field: Joi.number()
          .min(minVal)
          .max(maxVal)
      };
      break;
    case "TEXT_NUMBER":
      minVal = field.minVal ? field.minVal : 1;
      maxVal = field.maxVal ? field.maxVal : 1000;
      fieldSchema = {
        field: Joi.string()
          .trim()
          .regex(/^\d+$/)
          .min(minVal)
          .max(maxVal)
      };
      break;
    case "DATE":
      minVal = field.minVal ? field.minVal : 1;
      maxVal = field.maxVal ? field.maxVal : 1000;
      const now = Date.now();
      const latestDate = new Date(now - minVal * 365 * 24 * 60 * 60 * 1000);
      const earliestDate = new Date(now - maxVal * 365 * 24 * 60 * 60 * 1000);
      fieldSchema = {
        field: Joi.date()
          .min(earliestDate)
          .max(latestDate)
      };
      break;
    case "GOVERNATE":
      let governoratesData = require("../data/governorates.json");
      for (let i = 0; i < governoratesData.length && !found; i++) {
        found |= governoratesData[i].nameInEnglish === fieldValue;
        found |= governoratesData[i].nameInArabic === fieldValue;
      }
      if (!found)
        return errorMessage(`This Governorate: ${fieldValue} doesn't exist!`);
      return { success: "Form is valid!" };
    case "CITY":
      let citiesData = require("../data/cities.json");
      for (let i = 0; i < citiesData.length && !found; i++) {
        found |= citiesData[i].nameInEnglish === fieldValue;
        found |= citiesData[i].nameInArabic === fieldValue;
      }
      if (!found)
        return errorMessage(`This City: ${fieldValue} doesn't exist!`);
      return { success: "Form is valid!" };
    case "CURRENCY":
      let currenciesData = require("../data/currencies.json");
      for (let i = 0; i < currenciesData.length && !found; i++)
        found |= currenciesData[i].cc === fieldValue;
      if (!found)
        return errorMessage(`This Currency: ${fieldValue} doesn't exist!`);
      return { success: "Form is valid!" };
    case "DROPLIST":
      fieldSchema = {
        field: Joi.string().valid(field.options)
      };
      break;
  }

  const validation = Joi.validate({ field: fieldValue }, fieldSchema);
  if (validation.error)
    validation.error.details[0].message =
      field.fieldName + " " + validation.error.details[0].message;
  return validation;
}

exports.validateForm = async (form, formTemplate, update) => {
  const fields = formTemplate.fields;
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (form.hasOwnProperty(field.fieldName)) {
      let validation = validateField(form[field.fieldName], field);
      if (validation.error) return validation;
      if (field.isUnique) {
        let condition = {};
        condition["form." + field.fieldName] = form[field.fieldName];
        const instance = await Case.findOne(condition);
        if (instance)
          return errorMessage(
            `\"${form[field.fieldName]}\" inside the ${
              field.fieldName
            } field already exist!`
          );
      }
    } else {
      if (field.isRequired && !update)
        return errorMessage(`${field.fieldName} must be entered!`);
    }
  }
  for (let atr in form) {
    let found = false;
    for (let i = 0; i < fields.length && !found; i++)
      found = atr === fields[i].fieldName;
    if (!found)
      return errorMessage(`${atr} isn't allowed in the form template`);
  }
  return { success: "Form is valid!" };
};

exports.validateRules = async (formTemplate, newCase) => {
  let valid = false;
  try {
    const rulesFunction = makeRuleFunction(formTemplate.rulesFunction)();
    valid = rulesFunction(
      await Investor.findById(newCase.creatorInvestorId),
      newCase.form,
      newCase.managers
    );
  } catch (error) {
    return errorMessage("Error Parsing the rule function!");
  }
  if (typeof valid !== "boolean")
    try {
      valid = Boolean(valid);
    } catch (error) {
      return errorMessage(
        "The Rules Function doesn't return a boolean. Cannot validate!"
      );
    }
  if (!valid)
    return errorMessage("The Case doesn't staisfy the company type rules!");
  return { success: "Form is valid!" };
};
