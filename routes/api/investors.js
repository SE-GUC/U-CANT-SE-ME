const express = require("express");
const Joi = require("joi");

const router = express.Router();

const Investor = require("../../models/Investor");

let investors = [
  new Investor(
    "abc@gmail.com",
    "123",
    "Abc Ibn Xyz",
    "a",
    "M",
    "Egyptian",
    "National Card",
    "12233344445555",
    new Date(1990, 11, 18),
    "13th Mogama3 el Tahrir",
    "+201009913457",
    "123456"
  ),
  new Investor(
    "xyz@gmail.com",
    "345",
    "Xyz Abu Abc",
    "a",
    "M",
    "Egyptian",
    "National Card",
    "12277744445555",
    new Date(1965, 6, 6),
    "13th Mogama3 el Tahrir",
    "+201009913477",
    "123456"
  ),
  new Investor(
    "byd@gmail.com",
    "123",
    "Byd Om Abc",
    "a",
    "F",
    "Russian",
    "Passport",
    "12345678",
    new Date(1970, 7, 24),
    "13th Mogama3 el Tahrir",
    "+201009913476",
    "123456"
  )
];

//READ
router.get("/", (req, res) => res.send(investors));

router.get("/:id", (req, res) => {
  const investor = investors.find(inv => inv.id === req.params.id);
  if (!investor) return res.status(404).send("Investor not Found");
  res.send(investor);
});


//CREATE
router.post("/", (req, res) => {
  const inv = req.body;
  const { error } = validateInvestor(inv);
  if (error) return res.status(400).send(error.details[0].message);
  if (inv.nationality === "Egyptian" && inv.identificationNumber.length != 14)
    return res.status(400).send("Incorrect National ID number");
  const investor = new Investor(
    inv.email,
    inv.password,
    inv.fullName,
    inv.type,
    inv.gender,
    inv.nationality,
    inv.methodOfIdentification,
    inv.identificationNumber,
    inv.dateOfBirth,
    inv.residenceAddress,
    inv.telephoneNumber,
    inv.fax
  );
  investors.push(investor);
  res.send(investor);
});


//UPDATE
router.put("/:id", (req, res) => {
  const investor = investors.find(inv => inv.id === req.params.id);
  if(!investor) return res.status(404).send('Investor not Found');

  if(!req.body.email)
    req.body.email = investor.email;

  if(!req.body.password)
    req.body.password = investor.password;

  if(!req.body.fullName)
    req.body.fullName = investor.fullName;

  if(!req.body.type)
    req.body.type = investor.type;

  if(!req.body.gender)
    req.body.gender = investor.gender;

  if(!req.body.nationality)
    req.body.nationality = investor.nationality;

  if(!req.body.methodOfIdentification)
    req.body.methodOfIdentification = investor.methodOfIdentification;

  if(!req.body.identificationNumber)
    req.body.identificationNumber = investor.identificationNumber;

  if(!req.body.dateOfBirth)
    req.body.dateOfBirth = investor.dateOfBirth;

  if(!req.body.residenceAddress)
    req.body.residenceAddress = investor.residenceAddress;

  if(!req.body.telephoneNumber)
    req.body.telephoneNumber = investor.telephoneNumber;

  if(!req.body.residenceAddress)
    req.body.fax = investor.fax;

  const { error } = validateInvestor(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  investor.email = req.body.email;
  investor.password = req.body.password;
  investor.fullName = req.body.fullName;
  investor.type = req.body.type;
  investor.gender = req.body.gender;
  investor.nationality = req.body.nationality;
  investor.methodOfIdentification = req.body.methodOfIdentification;
  investor.identificationNumber = req.body.identificationNumber;
  investor.dateOfBirth = req.body.dateOfBirth;
  investor.residenceAddress = req.body.residenceAddress;
  investor.telephoneNumber = req.body.telephoneNumber;
  investor.fax = req.body.fax;
  res.send(investor);
});


function validateInvestor(investor) {
  const now = Date.now();
  const earliestBirthDate = new Date(now - 21 * 365 * 24 * 60 * 60 * 1000); //21 years earlier
  const schema = {
    email: Joi.string()
      .email()
      .lowercase()
      .required(),
    password: Joi.string()
      .min(8)
      .required(),
    fullName: Joi.string()
      .min(3)
      .required(),
    type: Joi.string().required(), //Input will come from a list. No need for: Joi.any().valid(['a', 'b', 'c']).required()
    gender: Joi.string().required(), //Input will come from a list. No need for: Joi.any().valid(['M', 'F']).required()
    nationality: Joi.string().required(), //Input will come from a list
    methodOfIdentification: Joi.string().required(), //Input will come from a list
    identificationNumber: Joi.string().required(),
    dateOfBirth: Joi.date().max(earliestBirthDate),
    residenceAddress: Joi.string().required(),
    telephoneNumber: Joi.string().optional(),
    fax: Joi.string().optional()
  };

  return Joi.validate(investor, schema);
}

module.exports = router;
