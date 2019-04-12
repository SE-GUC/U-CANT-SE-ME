// Dependencies
const mongoose = require("mongoose");
const validator = require("../validations/formTemplateValidations");
const mongoValidator = require("validator");

const FormTemplate = require("../models/FormTemplate");

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
