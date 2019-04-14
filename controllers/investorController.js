const mongoose = require("mongoose")
const mongoValidator = require("validator")
const passport = require("passport")
const nodemailer = require('nodemailer')
const async = require('async')
const stripeSecretKey = require("../config/keys").stripeSecretKey
const stripe = require("stripe")(stripeSecretKey)
const crypto = require('crypto')
const Investor = require('../models/Investor')
const validator = require('../validations/investorValidations')
const Case = require('../models/Case')
const encryption = require('../routes/api/utils/encryption')
const caseController = require('./caseController')

const investorAuthenticated = true;
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
    res.status(400).send({ msg: "Oops something went wrong" });
  }
};
exports.register = async function(req, res) {
  req.body.password = encryption.hashPassword(req.body.password);
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
    res.status(400).send({ msg: "Oops something went wrong" });
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
    
    // if (
    //   req.body.nationality === "Egyptian" &&
    //   req.body.identificationNumber.length != 14
    //   )
    //   return res.status(400).send("Incorrect National ID number");
      
      const { error } = validator.updateValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);
    try {
      
      await Investor.findByIdAndUpdate(req.params.id, req.body);
      res.send({ msg: "Investor updated successfully" });
    } catch (error) {
      return res.status(400).send({ error: "Oops something went wrong" });
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
  }
};

exports.viewLawyerComments = async function(req, res) {
  try {
    //if the user is authenticated give them access to the function otherwise return a Forbidden error
    if (investorAuthenticated) {
      //querying to find a Case where _id=caseID && creatorInvestorId=investorID
      let caseForForm = await Case.find({
        _id: req.params.caseID,
        creatorInvestorId: req.params.investorID
      });
      //if the query brings back a valid result set return its comments otherwise return an error
      if (caseForForm !== undefined && caseForForm.length > 0)
        res.json({ comments: caseForForm[0].comments });
      else res.status(404).send({ error: "Data Not Found" });
    } else return res.status(403).send({ error: "Forbidden." });
  } catch (error) {
    res.json({ msg: "An error has occured." });
  }
};

exports.updateForm = async function(req, res) {
  try {
    if (!investorAuthenticated)
      return res.status(403).send({ error: "Investor has no Access" });
    if (!mongoValidator.isMongoId(req.params.investorId))
      return res.status(403).send({ error: "Invalid Investor ID" });
    if (!mongoValidator.isMongoId(req.params.caseId))
      return res.status(403).send({ error: "Invalid Case ID" });
    const oldCase = await Case.findById(req.params.caseId);
    if (!oldCase) return res.status(403).send({ error: "Case doesn't Exist" });
    const neededInvestor = await Investor.findById(req.params.investorId);
    if (!neededInvestor) return res.status(403).send({ error: "investor doesn't Exist" });
    if (oldCase.creatorInvestorId.toString() !== req.params.investorId)
      return res.status(403).send({ error: "Not the case Creator" });
    // req.body.caseStatus = oldCase.caseStatus;
    // req.body.assignedLawyerId = oldCase.assignedLawyerId
    //   ? oldCase.assignedLawyerId.toString()
    //   : null;
    // req.body.assignedReviewerId = oldCase.assignedReviewerId
    //   ? oldCase.assignedReviewerId.toString()
    //   : null;
    req.params.id = req.params.caseId;
    if(oldCase.caseStatus==="OnUpdate" && oldCase.creatorLawyerId===null)
      await caseController.updateCase(req, res);
    else
    return res.status(403).send({ error: "Case is not in update status" });
  } catch (err) {
    res.send({ msg: "something went wrong" });
  }
};

exports.getMyCompanies = async function(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.investorID))
      return res.status(400).send({ error: "Incorrect Mongo ID" });
    const checkInvestor = await Investor.find({ _id: req.params.investorID });
    if (checkInvestor.length === 0)
      return res.status(404).send("Investor not Found");
    if (investorAuthenticated) {
      const companies = await Company.find({
        investorID: req.params.investorID
      });
      if (companies.length === 0)
        res.json({ msg: "You don't have any Companies yet." });
      else res.json({ data: companies });
    } else {
      return res.status(403).send({ error: "Forbidden." });
    }
  } catch {
    res.json({ msg: "An error has occured." });
  }
};

exports.trackMyCompany = async function(req, res) {
  try {
    if (!mongoValidator.isMongoId(req.params.id))
      return res.status(400).send({ err: "Invalid Investor Id" });

    const investor = await Investor.findById(req.params.id);
    if (!investor) {
      res.json({ error: "investor not found" });
      return;
    }

    const cases = await Case.find();

    const creatorInvestorId = req.params.id;
    flag = 0;
    message = "";
    let result = [];
    for (let i = 0; i < cases.length; i++) {
      if (String(cases[i].creatorInvestorId) === creatorInvestorId) {
        // slash is added for now as delimiter so we can separate them in front end later
        result.push({
          company:
            " Your company " +
            cases[i].form.companyNameEnglish +
            " is currently in phase " +
            cases[i].caseStatus +
            " "
        });
        flag = 1;
      }
    }

    if (flag == 0) {
      result.push({
        message: "You did not fill any establishment request yet."
      });
    }

    res.json({ tracking: result });
  } catch (error) {
    res.json({ msg: "An error has occured." });
  }
};

// As an Investor, I should be able to view my fees
exports.viewMyFees = async function(req, res) {
  const id = req.params.id;
  if (!mongoValidator.isMongoId(id)) {
    res.json({ error: "invalid ID format" });
    return;
  }
  const investor = await Investor.findById(id);
  if (!investor) {
    res.json({ error: "investor not found" });
    return;
  }
  const cases = await Case.find({
    creatorInvestorId: id,
    caseStatus: "Accepted"
  });

  let result = [];
  for (let i = 0; i < cases.length; i++) {
    const fees = calcFees(cases[i]);
    result.push({
      _id: cases[i]._id,
      companyName: cases[i].form.companyNameEnglish,
      fees: fees
    });
  }
  if (result.length == 0)
    res.json({ response: "you do not have any accepted company requests" });
  else res.json({ response: result });
};

function calcFees(case1) {
  if (case1.form.regulatedLaw.includes("72")) {
    return 610;
  }
  const capital = case1.form.capital;
  let ans = 56;
  ans += Math.min(1000, Math.max(100, capital / 1000.0));
  ans += Math.min(1000, Math.max(10, capital / 400.0));
  return ans;
}

exports.payFees = async function(req, res) {
  const investorId = req.params.investorId;
  const caseId = req.params.caseId;

  //Validate investorId
  if (!mongoValidator.isMongoId(investorId))
    return res.status(400).send({ err: "Invalid Investor Id" });
  const investor = await Investor.findById(investorId);
  if (!investor) return res.status(404).send("Investor not Found");

  //VAlidate caseId
  if (!mongoValidator.isMongoId(caseId))
    return res.status(400).send({ err: "Invalid case Id" });
  const selectedCase = await Case.findById(caseId);
  if (!selectedCase) return res.status(404).send("case not Found");

  const companyName = selectedCase.form.companyNameEnglish;

  if (selectedCase.caseStatus !== "Accepted")
    return res
      .status(400)
      .send(`The Company you chose is ${selectedCase.caseStatus}`);

  if (String(selectedCase.creatorInvestorId) !== String(investor._id))
    return res
      .status(403)
      .send("An Investor can only pay the fees of his/her accepted companies");

  const fees = calcFees(selectedCase);

  //Pay the fees
  stripe.charges
    .create({
      amount: fees * 100,
      currency: "EGP",
      description: "Company Esatblishment Fees",
      source: req.body.tokenId
    })
    .then(charge => {
      return res.send({ msg: "The Fees are payed successfully" });
    })
    .catch(err => {
      console.log(err);
      return res
        .status(400)
        .send({ msg: "Problem paying your Fees. Please try again" });
    });
};

exports.fillForm = async function(req, res) {
  try {
    if (investorAuthenticated) {
      req.body.creatorInvestorId = req.params.investorId;
      caseController.createCase(req, res); //Fadi's create-case
      // res.send({msg : "Form Submitted Successfully"});
    } else {
      return res.status(403).send({ error: "Forbidden." });
    }
  } catch (error) {
    res.json({ msg: "An error has occured." });
  }
};

exports.login = async function(req, res, next){
  passport.authenticate('investors',
  async function(err,investor){
    if (err) { return next(err) }
    if (!investor) { return res.redirect('/login') }
    req.login(investor,  async function(err) {
      if (err) { return next(err) }
      let investor = await Investor.where("email" , req.body.email)
      return res.redirect('/api/investors/' + investor[0]._id)
    })
  })(req, res, next)
}

exports.forgot = function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        let token = buf.toString('hex')
        done(err, token)
      })
    },
    function(token, done) {
      Investor.findOne({ email: req.body.email }, function(err, investor) {
        if (!investor) {
          req.flash('error', 'No account with that email address exists.')
          return res.redirect('/forgot')
        }

        investor.resetPasswordToken = token
        investor.resetPasswordExpires = Date.now() + 3600000 // 1 hour

        investor.save(function(err) {
          done(err, token, investor)
        })
      })
    },
    function(token, user, done) {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sumergiteme@gmail.com',
          pass: 'U-CANT-SE-ME'
        },
        tls:{
          rejectUnauthorized: false
        }
      })

      let mailOptions = {
        to: user.email,
        from: 'sumergiteme@gmail.com',
        subject: 'Password Reset Request',
        text: 'Hello '+ user.fullName+ ',\n\n' +
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://localhost:3000/investors/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n\n' +
          'Do not share this link with anyone.\n'
      }
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
        res.json({ msg: 'success' })
     })
    }
  ], function(err) {
    if (err) return next(err)
    res.redirect('/forgot')
  })
}

exports.reset = function(req, res){
  async.waterfall([
    function(done) {
      Investor.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.')
          return res.redirect('back')
        }

        user.password = encryption.hashPassword(req.body.password)
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined

        user.save(function(err) {
          req.logIn(user, function(err) {
            done(err, user)
          })
        })
      })
    },
    function(user, done) {
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'sumergiteme@gmail.com',
            pass: 'U-CANT-SE-ME'
          },
          tls:{
            rejectUnauthorized: false
          }
        })
      let mailOptions = {
        to: user.email,
        from: 'sumergiteme@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello '+ user.fullName+ ',\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      }
      transporter.sendMail(mailOptions, function(err, info) {
          if (error) {
              console.log(error)
          } else {
              console.log('Email sent: ' + info.response)
          }
          req.flash('success', 'Success! Your password has been changed.')
          done(err)
        })
      res.json({ msg: 'success' })
    }
  ], function(err) {
    res.redirect('/')
  })
}

exports.resumeWorkOnCase = async function(req, res)
{ 
  if(investorAuthenticated)
  {
    if(!mongoValidator.isMongoId(req.params.caseId) )
    return res.status(400).send({ err : "Invalid case id" });
    
    let myCase = await Case.findById(req.params.caseId)
    
    if(myCase === null)
    return res.status(400).send({ err : "Invalid case id" });
    
    if(myCase.assignedReviewerId !== null)
    return res.status(400).send({ err : "You are not the one required to update" });

    if(toString(myCase.creatorInvestorId) !== toString(req.params.creatorInvestorId))
    return res.status(400).send({ err : "This is not your case" });
    
    if(myCase.caseStatus!=="OnUpdate")
    return res.status(400).send({err: "This case is not in the update state"})
    
    try
    {
      await Case.findByIdAndUpdate(req.params.caseId,{"caseStatus":"AssignedToLawyer"})
      res.json(await Case.findById(req.params.caseId))
    }
    catch(error)
    {
      res.json({msg:"A fatal error has occured, could not update the case status."})
    }
  }
  else
  return res.status(403).send({error: "Forbidden." })
}
