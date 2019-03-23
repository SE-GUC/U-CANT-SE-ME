// Dependencies
const mongoose = require("mongoose");
const validator = require("../validations/caseValidations");
const mongoValidator = require("validator");

const Case = require("../models/Case");
const Lawyer = require("../models/Lawyer");
const Investor = require("../models/Investor");
const Reviewer = require("../models/Reviewer");

//Get a Case with a specific ID (get certain case)
exports.getCase = async function(req, res) {
  try {
    const caseId = req.params.id;
    if (!mongoValidator.isMongoId(caseId))
      return res.status(404).send({ error: "Invalid ID" });
    const neededCase = await Case.findById(caseId);
    if (!neededCase)
      return res.status(400).send({ err: "Case entered not found" });
    res.json({ data: neededCase });
  } catch (error) {
    res.send({ error: "Oops something went wrong!" });
    console.log(error);
  }
};

//Get all cases
exports.getAllCases = async function(req, res) {
  try {
    const cases = await Case.find();
    res.json({ data: cases });
  } catch (error) {
    res.send({ error: "Oops something went wrong!" });
    console.log(error);
  }
};

async function verfiyReferentialIntegrity(req) {
  //Checking the IDs format
  if (req.creatorInvestorId && !mongoValidator.isMongoId(req.creatorInvestorId))
    return { error: "Invalid creator Investor ID" };

  if (req.creatorLawyerId && !mongoValidator.isMongoId(req.creatorLawyerId))
    return { error: "Invalid creator Lawyer ID" };

  if (req.assignedLawyerId && !mongoValidator.isMongoId(req.assignedLawyerId))
    return { error: "Invalid assigned Lawyer ID" };

  if (
    req.assignedReviewerId &&
    !mongoValidator.isMongoId(req.assignedReviewerId)
  )
    return { error: "Invalid assigned Reviewer ID" };

  //Checking if the refrenced entities exist
  if (req.creatorInvestorId && !(await Investor.findById(req.creatorInvestorId)))
    return { error: "creator Investor doesn't exist" };

  if (req.creatorLawyerId && !(await Lawyer.findById(req.creatorLawyerId)))
    return { error: "creator Lawyer doesn't exist" };

  if (req.assignedLawyerId && !(await Lawyer.findById(req.assignedLawyerId)))
    return { error: "Assigned Lawyer doesn't exist" };

  if (
    req.assignedReviewerId &&
    !(await Lawyer.findById(req.assignedReviewerId))
  )
    return { error: "Assigned Reviewer doesn't exist" };

  return { success: "The case satisfies refrential Integrity" };
}

async function verfiyGeneralCompanyRules(req) {
  var countArabic = await Case.find({
    "form.companyNameArabic": req.form.companyNameArabic
  }).count();
  var countEnglish = await Case.find({
    "form.companyNameEnglish": req.form.companyNameEnglish
  }).count();
  if (countArabic > 0 || countEnglish > 0)
    return { error: "Company's name already Exist" };

  for (let i = 0; req.managers && i < req.managers.length; i++) {
    if (
      req.managers[i].managerNationality === "Egyptian" &&
      (req.managers[i].managerIdType !== "NID" ||
        req.managers[i].managerIdNumber.length !== 14)
    )
      return { error: "Incorrect Manager National ID" };
  }
  return { success: "Company Satisfies the general rules" };
}

async function verfiySPCRules(req) {
  const checkInvestor = await Investor.findById(req.creatorInvestorId);
  if (
    checkInvestor &&
    checkInvestor.nationality !== "Egyptian" &&
    req.form.capital < 100000
  ) {
    return { error: "Invalid capital" };
  }
  if (req.managers && req.managers.length > 0)
    return { error: "SPC Companies can not have any managers" };
  return { success: "Company Satisfies the SPC rules" };
}

async function verfiySSCRules(req) {
  const checkCase = await Case.findOne({
    creatorInvestorId: req.creatorInvestorId,
    "form.companyType": "SSC"
  });
  if (checkCase) return { error: "Investor entered has an existent SSC case" };
  if (
    req.form.capital &&
    (req.form.capital < 50000 || req.form.capital.toString().length > 12)
  )
    return { error: "Invalid capital" };
  const checkInvestor = await Investor.findById(req.creatorInvestorId);
  if (checkInvestor && checkInvestor.nationality !== "Egyptian") {
    var egyptianManager = false;
    for (let i = 0; req.managers && i < req.managers.length; i++)
      egyptianManager |= req.managers[i].managerNationality === "Egyptian";
    if (!egyptianManager)
      return {
        error:
          "There must be a single Egyptian Manager in case of a forginer founder"
      };
  }
  return { success: "Company Satisfies the SSC rules" };
}

//Create a case
exports.createCase = async function(req, res) {
  try {
    const { error } = validator.createValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    var check = await verfiyReferentialIntegrity(req.body);
    if (!check.success) return res.status(400).send(check.error);

    check = await verfiyGeneralCompanyRules(req.body);
    if (!check.success) return res.status(400).send(check.error);

    if (req.body.form.companyType === "SPC")
      check = await verfiySPCRules(req.body);
    else check = await verfiySSCRules(req.body);

    if (!check.success) return res.status(400).send(check.error);

    const newCase = await Case.create(req.body);
    res.json({ msg: "Case was created successfully", data: newCase });
  } catch (error) {
    res.send({ error: "Oops something went wrong!" });
    console.log(error);
  }
};

//Delete a case
exports.deleteCase = async function(req, res) {
  try {
    const caseID = req.params.id;
    if (!mongoValidator.isMongoId(caseID))
      return res.status(404).send({ error: "Invalid ID" });
    const neededCase = await Case.findById(caseID);
    if (!neededCase)
      return res.status(400).send({ err: "Case entered not found" });
    const deletedCase = await Case.findByIdAndRemove(caseID);
    res.json({ msg: "Case was deleted successfully", data: deletedCase });
  } catch (error) {
    res.send({ error: "Oops something went wrong!" });
    console.log(error);
  }
};

//update

//Update a case
exports.updateCase = async function(req, res) {
  try {
    if (!mongoValidator.isMongoId(req.params.id)) return res.status(404).send({ error: "Invalid case ID" });
    const exist = await Case.findById(req.params.id);
    if (!exist) return res.status(400).send({ error: "case entered not found" });

    const { error } = validator.updateValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    var check = await verfiyReferentialIntegrity(req.body);
    if (!check.success) return res.status(400).send(check.error);

    check = await verfiyGeneralCompanyRules(req.body);
    if (!check.success) return res.status(400).send(check.error);

    if (req.form.companyType === "SPC") check = await verfiySPCRules(req.body);
    else check = await verfiySSCRules(req.body);

    if (!check.success) return res.status(400).send(check.error);

    await Case.findByIdAndUpdate(req.params.id, req.body);
    res.send({ msg: "Case updated successfully" });
  } catch (error) {
    res.send({ error: "Oops something went wrong" });
    console.log(error);
  }
};
