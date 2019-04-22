// Dependencies
const validator = require("../validations/companyValidations");

//referenced Objects
const Company = require("../models/Company");
const Case = require("../models/Case");
const Investor = require("../models/Investor");

//Get a Company with a specific ID (get certain company)
exports.getCompany = async function(req, res) {
  try {
    //query for specified company (specific id passed in params)
    const requestedCompany = await Company.findById(req.params.id);
    res.send({ msg: "Company was found successfully", data: requestedCompany });
  } catch (error) {
    return res.status(404).send({ error: "Company does not exist!" });
  }
};

//Get all Companies
exports.getAllCompanies = async function(req, res) {
  try {
    //query for all companies
    const companies = await Company.find();
    res.send({ data: companies });
  } catch (error) {
    res.send({ error: "Something went wrong!" });
  }
};

//Create a Company
exports.createCompany = async function(req, res) {
  try {
    //saving caseID and passedID passed in body
    const caseId = req.body.caseId;
    const investorId = req.body.investorId;

    //passing body to the validator without caseID and investorID as they're not validated using Joi
    const result = validator.createValidation(req.body);
    //check that the passed data is valid if not return an error
    if (result.error)
      return res.status(400).send({ error: result.error.details[0].message });
    //querying for companies where the companyName is the same as the one passed in the body,
    //if the length of said query is >0 that means the companyName has been used before
    let postCompany = await Company.where(
      "companyNameArabic",
      req.body.companyNameArabic
    );
    //querying for all companies by the specified investor to check that they only have 1 SSC company (shown in loop)
    let investorCompanies = await Company.where(
      "investorId",
      req.body.investorId
    );
    let countSSC = 0;
    for (let i = 0; i < investorCompanies.length; i++)
      if (investorCompanies[i].companyType === "SSC") countSSC++;
    //if the investor already owns an SSC company and is trying to create an SSC company return an error
    if (countSSC > 0 && req.body.companyType === "SSC")
      return res.status(400).send({ error: "You already own an SSC Company!" });
    if (postCompany.length > 0)
      return res.status(400).send({ error: "Company name already taken!" });
    //return the caseID and investorID values to the body as they were deleted initially
    req.body.caseId = caseId;
    req.body.investorId = investorId;
    //checking that both investorID and caseID exist in the DB if they don't return an error
    const checkInvestorExists = await Investor.findById(req.body.investorId);
    const checkCaseExists = await Case.findById(req.body.caseId);
    if (checkCaseExists === null)
      return res.status(403).send({ error: "Forbidden" });
    if (checkInvestorExists === null)
      return res.status(403).send({ error: "Forbidden" });
    //creating the company after it passes all these tests
    const newCompany = await Company.create(req.body);
    res.send({ msg: "Company was created successfully", data: newCompany });
  } catch (error) {
    res.send({
      error: "An error has occured, check your entered data please."
    });
  }
};

//Update a Company
exports.updateCompany = async function(req, res) {
  try {
    const resultBody = validator.updateValidationBody(req.body);
    if (resultBody.error)
      return res
        .status(400)
        .send({ error: resultBody.error.details[0].message });
    let putCompany = await Company.findById(req.params.id);
    if (putCompany.length === 0)
      return res.status(404).send({ error: "Company does not exist!" });
    if (req.body.companyNameArabic) {
      let checkIfCompanyNameExists = await Company.where(
        "companyNameArabic",
        req.body.companyNameArabic
      );
      if (checkIfCompanyNameExists.length > 0)
        return res.status(400).send({ error: "Company name already taken!" });
      putCompany.companyNameArabic = req.body.companyNameArabic;
    }
    await Company.findByIdAndUpdate(req.params.id, putCompany);
    res.send({ msg: "Company updated successfully" });
  } catch (error) {
    res.send({
      error: " An error has occured, check your entered data please."
    });
  }
};

//Delete a Company
exports.deleteCompany = async function(req, res) {
  try {
    //finding company with specified ID and deleting it.
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    //if company does not exist notify the requester
    if (deletedCompany === null)
      return res.status(404).send({ error: "Company does not exist!" });
    res.send({ msg: "Company was deleted successfully", data: deletedCompany });
  } catch (error) {
    res.send({
      error: "An error has occured, please check your entered data."
    });
  }
};
