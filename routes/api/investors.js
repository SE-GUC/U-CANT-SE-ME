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
  const investor = investors.find(i => i.id === req.params.id);
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
    inv.ressidenceAddress,
    inv.telephoneNumber,
    inv.fax
  );
  investors.push(investor);
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
    ressidenceAddress: Joi.string().required(),
    telephoneNumber: Joi.string().optional(),
    fax: Joi.string().optional()
  };

  return Joi.validate(investor, schema);
}

module.exports = router;
