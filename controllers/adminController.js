// Dependencies
const validator = require("../validations/adminValidations");
const mongoValidator = require("validator");
const bcrypt = require('../routes/api/utils/encryption.js')

// Models
const Admin = require("../models/Admin");
const adminGettingAllCasesAuthenticated = true;
const caseController = require("./caseController");

// Get certain admin

exports.getAdmin = async function (req, res) {
  if (!mongoValidator.isMongoId(req.params.id))
    return res.status(400).send({ err: "Invalid Admin Id" });
  const admin = await Admin.findById(req.params.id);
  if (!admin) return res.status(404).send("Admin not Found");

  const adminID = req.params.id;
  const neededAdmin = await Admin.findById(adminID);
  res.json({ data: neededAdmin });
};

// Get all admins
exports.getAllAdmins = async function (req, res) {
  const admins = await Admin.find();
  res.json({ data: admins });
};

// create admins
exports.createAdmin = async function (req, res) {
  try {
    req.body.password = bcrypt.hashPassword(req.body.password)

    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });

    const newAdmin = await Admin.create(req.body);
    res.json({ msg: "Admin was created successfully", data: newAdmin });
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
};

// Update admin
exports.updateAdmin = async function (req, res) {
  try {
   

        if (!mongoValidator.isMongoId(req.params.id))
          return res.status(400).send({ err: "Invalid Admin Id" });
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).send("Admin not Found");

        const id = req.params.id;
        if (!req.body.username) req.body.username = admin.username;

        if (!req.body.password) req.body.password = bcrypt.hashPassword(req.body.password)  ;

        if (!req.body.fullName) req.body.fullName = admin.fullName;

        req.body.password = bcrypt.hashPassword(req.body.password) ;
        const isValidated = validator.updateValidation(req.body);
        if (isValidated.error)
          return res
            .status(400)
            .send({ error: isValidated.error.details[0].message });

        await Admin.findByIdAndUpdate(req.params.id, req.body);

        if (!admin) return res.status(404).send({ error: "admin does not exist" });

        res.json({ msg: "Admin updated successfully" });

  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
};

exports.deleteAdmin = async function (req, res) {
  try {
    if (!mongoValidator.isMongoId(req.params.id))
      return res.status(400).send({ err: "Invalid Admin Id" });
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).send("Admin not Found");

    const adminID = req.params.id;
    const deletedAdmin = await Admin.findByIdAndRemove(adminID);
    res.json({ msg: "Admin was deleted successfully", data: deletedAdmin });
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
};

exports.GetAllCases = async function (req, res) {
  if (adminGettingAllCasesAuthenticated) {
    await caseController.getAllCases(req, res);
  } else {
    res
      .status(404)
      .send({ error: "something wrong happened check your identity" });
  }
};
