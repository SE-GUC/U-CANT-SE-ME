// Dependencies
const mongoose = require("mongoose");
const validator = require("../validations/dcaseValidations");
const mongoValidator = require("validator");

const Case = require("../models/dCase");
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

async function verfiyGeneralCompanyRules(req) {
  var countArabic = 0;
  if (req.form.companyNameArabic)
    await Case.find({
      "form.companyNameArabic": req.form.companyNameArabic
    }).count();
  var countEnglish = 0;
  if (req.form.companyNameEnglish)
    await Case.find({
      "form.companyNameEnglish": req.form.companyNameEnglish
    }).count();
  console.log(req);
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

async function addMissingAttributes(req) {
  const oldCase = await Case.findById(req.params.id);
  if (!req.body.form.companyNameArabic)
    req.body.form.companyNameArabic = oldCase.form.companyNameArabic;
  if (!req.body.form.companyNameEnglish)
    req.body.form.companyNameEnglish = oldCase.form.companyNameEnglish;
  if (!req.body.form.regulatedLaw)
    req.body.form.regulatedLaw = oldCase.form.regulatedLaw;
  if (!req.body.form.legalFormOfCompany)
    req.body.form.legalFormOfCompany = oldCase.form.legalFormOfCompany;
  if (!req.body.form.headOfficeGovernorate)
    req.body.form.headOfficeGovernorate = oldCase.form.headOfficeGovernorate;
  if (!req.body.form.headOfficeCity)
    req.body.form.headOfficeCity = oldCase.form.headOfficeCity;
  if (!req.body.form.headOfficeAddress)
    req.body.form.headOfficeAddress = oldCase.form.headOfficeAddress;
  if (!req.body.form.phoneNumber)
    req.body.form.phoneNumber = oldCase.form.phoneNumber;
  if (!req.body.form.fax) req.body.form.fax = oldCase.form.fax;
  if (!req.body.form.currencyUsedForCapital)
    req.body.form.currencyUsedForCapital = oldCase.form.currencyUsedForCapital;
  if (!req.body.form.capital) req.body.form.capital = oldCase.form.capital;
}

//Update a case
exports.updateCase = async function(req, res) {
  try {
    if (!mongoValidator.isMongoId(req.params.id))
      return res.status(404).send({ error: "Invalid case ID" });
    const exist = await Case.findById(req.params.id);
    if (!exist)
      return res.status(400).send({ error: "case entered not found" });

    const { error } = validator.updateValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    var check = await verfiyReferentialIntegrity(req.body);
    if (!check.success) return res.status(400).send(check.error);

    check = await verfiyGeneralCompanyRules(req.body);
    if (!check.success) return res.status(400).send(check.error);

    if (req.body.form.companyType === "SPC")
      check = await verfiySPCRules(req.body);
    else check = await verfiySSCRules(req.body);

    if (!check.success) return res.status(400).send(check.error);

    await addMissingAttributes(req);
    await Case.findByIdAndUpdate(req.params.id, req.body);
    const newCase = await Case.findById(req.params.id);
    if (newCase.caseStatus === "Accepted")
      NotificationController.notifyInvestorByFees(newCase);
    res.send({ msg: "Case updated successfully" });
  } catch (error) {
    res.status(403).send({ error: "Oops something went wrong" });
    console.log(error);
  }
};
exports.calcFees = function(case1) {
  if (case1.form.regulatedLaw.includes("72")) {
    return 610;
  }
  const capital = case1.form.capital;
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
      return res.status(400).send({ err: "Case entered not found" });

    const lawyerid = neededCase.assignedLawyerId;
    const lawyer = await Lawyer.findById(lawyerid);

    if (!lawyer) {
      return res
        .status(400)
        .send({ msg: "This case was never assigned lawyer" });
    } else {
      res.json({ lawyerName: lawyer.fullName });
    }
  } catch (error) {
    res.json({ msg: "An error has occured." });
  }
};
