// Dependencies
const validator = require("../validations/adminValidations");
const mongoValidator = require("validator");
const bcrypt = require('../routes/api/utils/encryption.js')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const tokenKey = require('../config/keys_dev').secretOrKey
// Models
const Admin = require("../models/Admin");
const adminGettingAllCasesAuthenticated = true;
const caseController = require("./caseController");
const reviewerController = require('./reviewerController')
const lawyerController = require('./lawyerController')
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

        if (!req.body.password) req.body.password = admin.password  ;
        else req.body.password = bcrypt.hashPassword(req.body.password);

        if (!req.body.fullName) req.body.fullName = admin.fullName;

      
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

//as admin i should be able to register lawyer
exports.registerLawyer = async function(req,res){
  req.body.password=bcrypt.hashPassword(req.body.password)
  return res.send({data: await lawyerController.createLawyer(req, res)})
}
//as admin i should be able to register reviwer
exports.registerReviewer = async function(req, res){
  req.body.password = bcrypt.hashPassword(req.body.password)
  return res.send({data: await reviewerController.createReviewer(req, res)})
}

exports.loginAdmin = function(req, res, next){
  passport.authenticate('admins',
  async function(err,user){
    if (err) { return next(err); }
    if (!user) { return res.redirect('/api/admins/login'); }
    req.logIn(user,  async function(err) {
      try{

      
      if (err) { return next(err); }
      var admin = await Admin.where("username" , req.body.username);
      const payload = {
        id : admin[0]._id,
        username : admin[0].username,
        type: 'admin'
      }
      
      const token = jwt.sign(payload, tokenKey,{expiresIn:'1h'})
      res.json({data : `Bearer ${token}`})
      return res.json({data:'Token'})
    }
    catch(err){
      return err;
    }
    });
  })(req, res, next)
  };