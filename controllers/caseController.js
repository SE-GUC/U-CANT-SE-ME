// Dependencies
const mongoose = require("mongoose");
const validator = require("../validations/caseValidations");
const mongoValidator = require("validator");

const Case = require("../models/Case");
const Lawyer = require("../models/Lawyer");
const Investor = require("../models/Investor");
const Reviewer = require("../models/Reviewer");
const NotificationController = require("./notificationController");

//Get all cases
exports.getAllCases = async function(req, res) {
  const cases = await Case.find();
  res.send({ msg: "Cases successfully loaded!", data: cases });
};

//Get a Case with a specific ID (get certain case)
exports.getCase = async function(req, res) {
  if (!mongoValidator.isMongoId(req.params.id))
    return res.status(400).send({ error: "Invalid ID format!" });
  const neededCase = await Case.findById(req.params.id);
  if (!neededCase)
    return res.status(404).send({ error: "The given Case is not found!" });
  res.send({ msg: "Case successfully loaded!", data: neededCase });
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
  if (
    req.creatorInvestorId &&
    !(await Investor.findById(req.creatorInvestorId))
  )
    return { error: "creator Investor doesn't exist" };

  if (req.creatorLawyerId && !(await Lawyer.findById(req.creatorLawyerId)))
    return { error: "creator Lawyer doesn't exist" };

  if (req.assignedLawyerId && !(await Lawyer.findById(req.assignedLawyerId)))
    return { error: "Assigned Lawyer doesn't exist" };

  if (
    req.assignedReviewerId &&
    !(await Reviewer.findById(req.assignedReviewerId))
  )
    return { error: "Assigned Reviewer doesn't exist" };

  return { success: "The case satisfies refrential Integrity" };
}

//Create a case
exports.createCase = async function(req, res) {
  try {
    const { error } = await validator.createValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    var check = await verfiyReferentialIntegrity(req.body);
    if (!check.success) return res.status(400).send({ error: check.error });

    const newCase = await Case.create(req.body);
    res.send({ msg: "Case was created successfully", data: newCase });
  } catch (error) {
    res.send({ error: "Oops something went wrong!" });
    console.log(error);
  }
};

//Delete a case
exports.deleteCase = async function(req, res) {
  const caseID = req.params.id;
  if (!mongoValidator.isMongoId(caseID))
    return res.status(400).send({ error: "Invalid ID" });
  const neededCase = await Case.findByIdAndRemove(caseID);
  if (!neededCase)
    return res.status(404).send({ error: "Case entered not found" });
  res.send({ msg: "Case was deleted successfully", data: neededCase });
};

//Update a case
exports.updateCase = async function(req, res) {
  try {
    if (!mongoValidator.isMongoId(req.params.id))
      return res.status(400).send({ error: "Invalid case ID" });

    const exist = await Case.findById(req.params.id);
    if (!exist)
      return res.status(404).send({ error: "case entered not found" });

    const { error } = await validator.updateValidation(
      req.body,
      exist.companyType
    );
    if (error) return res.status(400).send({ error: error.details[0].message });

    var check = await verfiyReferentialIntegrity(req.body);
    if (!check.success) return res.status(400).send({ error: check.error });

    if (req.body.form) {
      const oldForm = exist.form;
      for (let atr in oldForm)
        if (!req.body.form.hasOwnProperty(atr))
          req.body.form[atr] = oldForm[atr];
    }

    for (let atr in req.body) exist[atr] = req.body[atr];

    const rulesValidation = await validator.rulesValidation(
      exist,
      exist.companyType
    );

    if (rulesValidation.error)
      return res.status(400).send({ error: rulesValidation.error.details[0].message });

    await Case.updateOne({ _id: req.params.id }, { $set: { ...req.body } });

    const newCase = await Case.findById(req.params.id);
    if (newCase.caseStatus === "Accepted")
      NotificationController.notifyInvestorByFees(newCase);

    res.send({ msg: "Case updated successfully" });
  } catch (error) {
    res.status(403).send({ error: "Oops something went wrong" });
    console.log(error);
  }
};

exports.calcFees = function(targetCase) {
  if (targetCase.form.regulatedLaw.includes("72")) {
    return 610;
  }
  const capital = targetCase.form.capital;
  let ans = 56;
  ans += Math.min(1000, Math.max(100, capital / 1000.0));
  ans += Math.min(1000, Math.max(10, capital / 400.0));
  return ans;
};

// As a Entity Employee, I should be able view the name of the last lawyer who worked on a specific case from the cases page.
exports.getCaseLastLawyer = async function(req, res) {
  try {
    const caseId = req.params.id;
    if (!mongoValidator.isMongoId(caseId))
      return res.status(404).send({ error: "Invalid ID" });
    const neededCase = await Case.findById(caseId);
    if (!neededCase)
      return res.status(400).send({ error: "Case entered not found" });

    const lawyerid = neededCase.assignedLawyerId;
    const lawyer = await Lawyer.findById(lawyerid);

    if (!lawyer) {
      return res
        .status(400)
        .send({ msg: "This case was never assigned lawyer" });
    } else {
      res.send({ lawyerName: lawyer.fullName });
    }
  } catch (error) {
    res.send({ msg: "An error has occured." });
  }
};
