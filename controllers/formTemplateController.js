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
exports.makeRuleFunction = function(rulesFunction) {
  let wrapper =
    "function (investor, form, managers = []) { " + rulesFunction + " } ";
  return new Function("return " + wrapper);
};

function validateField(fieldValue, field) {
  let fieldType = field.fieldType,
    fieldSchema = {},
    minVal,
    maxVal;
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
          .regex(/^[0-9]{minVal,maxVal}$/)
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
      let found = false;
      for (let i = 0; i < governoratesData.length && !found; i++) {
        found |= governoratesData[i].nameInEnglish === fieldValue;
        found |= governoratesData[i].nameInArabic === fieldValue;
      }
      if (!found)
        return {
          error: {
            details: [
              { message: `This Governorate: ${fieldValue} doesn't exist!` }
            ]
          }
        };
      return { success: "Form is valid!" };
    case "CITY":
      let citiesData = require("../data/cities.json");
      let found = false;
      for (let i = 0; i < citiesData.length && !found; i++) {
        found |= citiesData[i].nameInEnglish === fieldValue;
        found |= citiesData[i].nameInArabic === fieldValue;
      }
      if (!found)
        return {
          error: {
            details: [{ message: `This City: ${fieldValue} doesn't exist!` }]
          }
        };
      return { success: "Form is valid!" };
    case "CURRENCY":
      let currenciesData = require("../data/currencies.json");
      let found = false;
      for (let i = 0; i < currenciesData.length && !found; i++)
        found |= currenciesData[i].code === fieldValue;
      if (!found)
        return {
          error: {
            details: [
              { message: `This Currency: ${fieldValue} doesn't exist!` }
            ]
          }
        };
      return { success: "Form is valid!" };
    case "DROPLIST":
      fieldSchema = {
        field: Joi.string().valid(field.options)
      };
      break;
  }
  return Joi.validate({ field: fieldValue }, fieldSchema);
}

exports.validateForm = (form, formTemplate) => {
  const fields = formTemplate.fields;
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (form.hasOwnProperty(field.fieldName)) {
      let validation = validateField(form[field.fieldName], field);
      if (validation.error) return validation;
      if (field.isUnique) {
        let fieldNameInCase = "form." + field.fieldName;
        const instance = Case.find({ fieldNameInCase: form[field.fieldName] });
        if (instance)
          return {
            error: {
              details: [
                {
                  message: `${field.fieldValue} inside the ${
                    field.fieldName
                  } field already exist!`
                }
              ]
            }
          };
      }
    } else {
      if (field.isRequired)
        return {
          error: {
            details: [{ message: `${field.fieldName} must be entered!` }]
          }
        };
    }
  }
  for (let atr in form) {
    let found = false;
    for (let i = 0; i < fields.length && !found; i++)
      found = atr === fields[i].fieldName;
    if (!found)
      return {
        error: {
          details: [{ message: `${atr} isn't allowed in the form template` }]
        }
      };
  }
  return { success: "Form is valid!" };
};
