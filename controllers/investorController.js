const mongoose = require("mongoose");
const mongoValidator = require("validator");

const Investor = require("../models/Investor");
const validator = require("../validations/investorValidations");

//READ
exports.getAllInvestors = async function(req, res) {
  const investors = await Investor.find();
  res.send(investors);
};

exports.getInvestor = async function(req, res) {
  if (!mongoValidator.isMongoId(req.params.id))
    return res.status(400).send({ err: "Invalid Investor Id" });
  const investor = await Investor.findById(req.params.id);
  if (!investor) return res.status(404).send("Investor not Found");
  res.send(investor);
};

//CREATE
exports.createInvestor = async function(req, res) {
  const { error } = validator.createValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (
    req.body.nationality === "Egyptian" &&
    req.body.identificationNumber.length != 14
  )
    return res.status(400).send("Incorrect National ID number");
  try {
    const investor = await Investor.create(req.body);
    res.send(investor);
  } catch (err) {
    res.send({ msg: "Oops something went wrong" });
    console.log(err);
  }
};

//UPDATE
exports.updateInvestor = async function(req, res) {
  if (!mongoValidator.isMongoId(req.params.id))
    return res.status(400).send({ err: "Invalid Investor Id" });
  const investor = await Investor.findById(req.params.id);
  if (!investor) return res.status(404).send("Investor not Found");

  if (!req.body.email) req.body.email = investor.email;

  if (!req.body.password) req.body.password = investor.password;

  if (!req.body.fullName) req.body.fullName = investor.fullName;

  if (!req.body.type) req.body.type = investor.type;

  if (!req.body.gender) req.body.gender = investor.gender;

  if (!req.body.nationality) req.body.nationality = investor.nationality;

  if (!req.body.methodOfIdentification)
    req.body.methodOfIdentification = investor.methodOfIdentification;

  if (!req.body.identificationNumber)
    req.body.identificationNumber = investor.identificationNumber;

  if (!req.body.dateOfBirth) req.body.dateOfBirth = investor.dateOfBirth;

  if (!req.body.residenceAddress)
    req.body.residenceAddress = investor.residenceAddress;

  if (!req.body.telephoneNumber)
    req.body.telephoneNumber = investor.telephoneNumber;

  if (!req.body.residenceAddress) req.body.fax = investor.fax;

  if (
    req.body.nationality === "Egyptian" &&
    req.body.identificationNumber.length != 14
  )
    return res.status(400).send("Incorrect National ID number");

  const { error } = validator.updateValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await Investor.findByIdAndUpdate(req.params.id, req.body);
    res.send({ msg: "Investor updated successfully" });
  } catch (err) {
    res.send({ msg: "Oops something went wrong" });
    console.log(err);
  }
};

exports.deleteInvestor = async function(req, res) {
  try {
    if (!mongoValidator.isMongoId(req.params.id))
      return res.status(400).send({ err: "Invalid Investor Id" });
    const investor = await Investor.findByIdAndRemove(req.params.id);
    if (!investor) return res.status(404).send("Investor doesn't exist");
    res.send(investor);
  } catch (err) {
    res.send({ msg: "Oops something went wrong" });
    console.log(err);
  }
};
