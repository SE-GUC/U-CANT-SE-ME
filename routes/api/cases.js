const express = require("express");
const uuid = require("uuid");
const router = express.Router();

const Case = require("../../models/Case");
const cases = [];
//get all cases

router.get("/", (req, res) => res.json({ data: cases }));

router.get("/:id", (req, res) => {
  const caseID = req.params.id;
  for (let i = 0; i < cases.length; i++) {
    if (cases[i].caseID === caseID) return res.json({ data: cases[i] });
  }
  return res.status(404).send({ error: "ERROR 404: Case does not exist" });
});

router.post("/", (req, res) => {
  const investorID = req.body.investorID;
  const lawyerID = req.body.lawyerID;
  const companyType = req.body.companyType;
  const regulatedLaw = req.body.regulatedLaw;
  const legalFormOfCompany = req.body.legalFormOfCompany;
  const companyNameArabic = req.body.companyNameArabic;
  const companyNameEnglish = req.body.companyNameEnglish;
  const headOfficeGovernorate = req.body.headOfficeGovernorate;
  const headOfficeCity = req.body.headOfficeCity;
  const headOfficeAddress = req.body.headOfficeAddress;
  const phoneNumber = req.body.phoneNumber;
  const fax = req.body.fax;
  const currencyUsedForCapital = req.body.currencyUsedForCapital;
  const capital = req.body.capital;
  const IDType = req.body.IDType;
  const IDnumber = req.body.IDnumber;
  const minimumCapitalLimit = req.body.minimumCapitalLimit;
  const managerName = req.body.managerName;
  const managerType = req.body.managerType;
  const managerGender = req.body.managerGender;
  const managerNationality = req.body.managerNationality;
  const managerIDType = req.body.managerIDType;
  const managerIDNumber = req.body.managerIDNumber;
  const managerDateOfBirth = req.body.managerDateOfBirth;
  const managerResidenceAdress = req.body.managerResidenceAdress;
  const managerPositionInBoardOfDirectors =
    req.body.managerPositionInBoardOfDirectors;
  if (phoneNumber) {
    if (typeof phoneNumber !== "string")
      return res.status(400).send({ err: "phone must be a string" });
  }
  if (fax) {
    if (typeof fax !== "string")
      return res.status(400).send({ err: "fax must be a string" });
  }
  if (!investorID && !lawyerID)
    return res
      .status(400)
      .send({ err: "There must be a lawyer ID or an investor ID" });
  if (typeof investorID !== "string" || typeof lawyerID !== "string")
    return res.status(400).send({ err: "Invalid value for ID" });
  if (!companyType)
    return res.status(400).send({ err: "Company type field is required" });
  if (companyType !== "SPC" && companyType !== "SSC")
    return res.status(400).send({ err: "Invalid value for company type" });
  if (!regulatedLaw)
    return res.status(400).send({ err: "There must be a regulated law" });
  if (typeof regulatedLaw !== "string")
    return res.status(400).send({ err: "regulated law must be string" });
  if (!legalFormOfCompany)
    return res
      .status(400)
      .send({ err: "There must be a legal form of the company" });
  if (typeof legalFormOfCompany !== "string")
    return res.status(400).send({ err: "legal form must be string" });
  if (!companyNameArabic)
    return res
      .status(400)
      .send({ err: "There must be an arabic name of the company" });
  if (typeof companyNameArabic !== "string")
    return res.status(400).send({ err: "company name must be string" });
  if (typeof companyNameEnglish !== "string")
    return res.status(400).send({ err: "company name must be string" });
  if (!headOfficeGovernorate)
    return res
      .status(400)
      .send({ err: "There must be a headOfficeGovernorate" });
  if (typeof headOfficeGovernorate !== "string")
    return res
      .status(400)
      .send({ err: "headOfficeGovernorate must be string" });
  if (!headOfficeCity)
    return res.status(400).send({ err: "There must be a headOfficeCity" });
  if (typeof headOfficeCity !== "string")
    return res.status(400).send({ err: "headOfficeCity must be string" });
  if (!headOfficeAddress)
    return res.status(400).send({ err: "There must be a headOfficeAdress" });
  if (typeof headOfficeAddress !== "string")
    return res.status(400).send({ err: "headOfficeAdress must be string" });
  if (!currencyUsedForCapital)
    return res
      .status(400)
      .send({ err: "There must be a currencyUsedForCapital" });
  if (typeof currencyUsedForCapital !=='string')
    return res.status(400).send({ err: "currencyUsedForCapital string" });
  if (!capital) return res.status(400).send({ err: "There must be a Capital" });
  if (typeof capital !== "number")
    return res.status(400).send({ err: "Capital must be number" });
  if (!IDType) return res.status(400).send({ err: "There must be an ID type" });
  if (typeof IDType !== "string")
    return res.status(400).send({ err: "ID type must be string" });
  if (!IDnumber)
    return res.status(400).send({ err: "There must be an ID number" });
  if (typeof IDnumber !== "number")
    return res.status(400).send({ err: "ID number must be a number" });
  if (companyType === "SSC") {
    if (!managerName)
      return res.status(400).send({ err: "There must be an manager name" });
    if (typeof managerName !== "string")
      return res.status(400).send({ err: "manager name must be a string" });
    if (!managerNationality)
      return res
        .status(400)
        .send({ err: "There must be a manager nationality" });
    if (typeof managerNationality !== "string")
      return res
        .status(400)
        .send({ err: "manager nationality must be a string" });
  }
  if (!managerType)
    return res.status(400).send({ err: "There must be a manager type" });
  if (typeof managerType !== "string")
    return res.status(400).send({ err: "manager type must be a string" });
  if (!managerGender)
    return res.status(400).send({ err: "There must be a manager gender" });
  if (typeof managerGender !== "string")
    return res.status(400).send({ err: "manager gender needed" });
  if (managerGender !== "male" && managerGender !== "female")
    return res.status(400).send({ err: "invalid manager gender input" });
  if (!managerIDType)
    return res.status(400).send({ err: "There must be a manager ID type" });
  if (typeof managerIDType !== "string")
    return res.status(400).send({ err: "managerIDType must be string" });
  if (!managerIDNumber)
    return res.status(400).send({ err: "There must be an ID number" });
  if (typeof managerIDNumber !== "number")
    return res.status(400).send({ err: "ID number must be a number" });
  if (!managerDateOfBirth)
    return res
      .status(400)
      .send({ err: "There must be a manager date of birth" });
  if (typeof managerDateOfBirth !== 'Date')
    return res.status(400).send({ err: "date of birth must be date" });
  if (!managerResidenceAdress)
    return res
      .status(400)
      .send({ err: "There must be a manager residence adress" });
  if (typeof managerResidenceAdress !== "string")
    return res
      .status(400)
      .send({ err: "manager residence adress must be a string" });
  if (!managerPositionInBoardOfDirectors)
    return res
      .status(400)
      .send({ err: "There must be a manager position in board" });
  if (typeof managerPositionInBoardOfDirectors !== "string")
    return res.status(400).send({ err: "position must be a string" });

  const newCase = new Case(
    investorID,
    lawyerID,
    companyType,
    regulatedLaw,
    legalFormOfCompany,
    companyNameArabic,
    companyNameEnglish,
    headOfficeGovernorate,
    headOfficeCity,
    headOfficeAddress,
    phoneNumber,
    fax,
    currencyUsedForCapital,
    capital,
    IDType,
    IDnumber,
    minimumCapitalLimit,
    managerName,
    managerType,
    managerGender,
    managerNationality,
    managerIDType,
    managerIDNumber,
    managerDateOfBirth,
    managerResidenceAdress,
    managerPositionInBoardOfDirectors
  );

  cases.push(newCase);
  return res.json({ data: newCase });
});

//delete case

router.delete("/:caseID", (req, res) => {
  const id = req.params.caseID;
  let caseExists = false;
  for (let i = 0; i < cases.length; i++) {
    if (cases[i].caseID === id) {
      cases.splice(i, 1);
      caseExists = true;
      break;
    }
  }
  if (!caseExists) return res.status(404).send({ error: "case not there" });
  return res.json({ data: cases });
});

//update
//assignedReviewers
//assignedLawyers
//status
router.put("/update/:caseID", (req, res) => {
  const caseID = req.params.caseID;
  // const Case = cases.find(Case => Case.caseID === caseID )
  var Case = null;
  for (let i = 0; i < cases.length; i++)
    if (cases[i].caseID === caseID) Case = cases[i];
  if (Case === null)
    return res.status(400).send({ err: "Can not find the Case ID" });

  //check here again for the updates
  const Update_caseStatus = req.body.caseStatus;
  const New_Lawyer = req.body.NewLawyer;
  const New_Reviewer = req.body.NewReviewer;

  if (Update_caseStatus) Case.caseStatus = Update_caseStatus;
  if (New_Lawyer) Case.assignedLawyers.push(New_Lawyer);
  if (New_Reviewer) Case.assignedReviewers.push(New_Reviewer);

  res.send(cases);
});

module.exports = router;
