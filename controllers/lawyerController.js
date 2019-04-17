// Dependencies
const mongoose = require("mongoose");
const validator = require("../validations/lawyerValidations");
const mongoValidator = require("validator");
const passport = require("passport");
const encryption = require("../routes/api/utils/encryption");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const async = require("async");
// module Lawyer
const Investor = require("../models/Investor");
const Lawyer = require("../models/Lawyer");
const Reviewer = require("../models/Reviewer");
const caseController = require("./caseController");
const LawyerGettingAllCasesAuthenticated = true;
const bcrypt = require("../routes/api/utils/encryption");
// module Case
const Case = require("../models/Case.js");

const lawyerAuthenticated = true;

//Read
exports.getAllLawyers = async function(req, res) {
  const lawyers = await Lawyer.find();
  res.send({ data: lawyers });
};

exports.getLawyer = async function(req, res) {
  try {
    const id = req.params.id;
    const lawyer = await Lawyer.findOne({ _id: id });
    if (!lawyer)
      return res.status(404).send({ error: "lawyer does not exist" });
    res.send({ data: lawyer });
  } catch (error) {
    res.status(404).send({ error: "lawyer does not exist" });
  }
};

async function checkUniqueEmail(email) {
  const existingInvestor = await Investor.findOne({ email: email });
  if (existingInvestor) return false;

  const existingLawyer = await Lawyer.findOne({ email: email });
  if (existingLawyer) return false;

  const existingReviewer = await Reviewer.findOne({ email: email });
  if (existingReviewer) return false;

  return true;
}

//Create
exports.createLawyer = async function(req, res) {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error) {
      res.status(400).send({ error: isValidated.error.details[0].message });
      return;
    }

    const isUniqueEmail = await checkUniqueEmail(req.body.email);
    if (!isUniqueEmail)
      return res
        .status(400)
        .send({ error: `email ${req.body.email} is already taken!` });

    const newLawyer = await Lawyer.create(req.body);
    res.send({ msg: "Lawyer was created successfully", data: newLawyer });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
};

//Update
exports.updateLawyer = async function(req, res) {
  try {
    const id = req.params.id;
    const lawyer = await Lawyer.findOne({ _id: id });
    if (!lawyer) {
      res.status(404).send({ error: "lawyer does not exist" });
      return;
    }
    if (!req.body.email) req.body.email = lawyer.email;
    if (!req.body.password) {
      req.body.password = lawyer.password;
    } else {
      req.body.password = bcrypt.hashPassword(req.body.password);
    }
    if (!req.body.fullName) req.body.fullName = lawyer.fullName;
    if (!req.body.username) req.body.username = lawyer.username;
    const email = req.body.email;
    const password = req.body.password;
    const fullName = req.body.fullName;
    const username = req.body.username;

    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error) {
      res.status(400).send({ error: isValidated.error.details[0].message });
      return;
    }
    await Lawyer.findByIdAndUpdate(id, {
      email,
      password,
      fullName,
      username
    });
    res.send({ msg: "lawyer updated successfully" });
  } catch (error) {
    res.status(404).send({ error: "lawyer does not exist" });
  }
};

//Create
exports.deleteLawyer = async function(req, res) {
  try {
    const id = req.params.id;
    const lawyer = await Lawyer.findOne({ _id: id });
    if (!lawyer) {
      res.status(404).send({ error: "lawyer does not exist" });
      return;
    }
    const deletedLawyer = await Lawyer.findByIdAndRemove(id);
    res.send({ msg: "lawyer was deleted successfully", data: deletedLawyer });
  } catch (error) {
    res.status(404).send({ error: "lawyer does not exist" });
  }
};

//as a lawyer i should be able to fill a company creation form
exports.fillForm = async function(req, res) {
  const lawyerId = req.params.id;
  req.body.creatorLawyerId = lawyerId;
  req.body.caseStatus = "WaitingForReviewer";
  req.body.assignedLawyerId = req.params.id;
  await caseController.createCase(req, res);
};

exports.getAllCases = async function(req, res) {
  if (LawyerGettingAllCasesAuthenticated) {
    await caseController.getAllCases(req, res);
  } else {
    res
      .status(404)
      .send({ error: "something wrong happened check your identity" });
  }
};
//as a lawyer i should be able to view all my due tasks
exports.viewTasks = async function(req, res) {
  try {
    if (lawyerAuthenticated) {
      let lawyerCases = await Case.where({
        assignedLawyerId: req.params.lawyerId,
        caseStatus: "AssignedToLawyer"
      });

      if (lawyerCases !== undefined && lawyerCases.length > 0)
        res.send({ Tasks: lawyerCases });
      else res.status(404).send({ error: "Data Not Found" });
    } else return res.status(403).send({ error: "Forbidden." });
  } catch (error) {
    res.status(400).send({ error: "An error has occured." });
  }
};
//As a lawyer I should be able to accept or reject a company establishment form made by an investor
exports.acceptRejectForm = async function(req, res) {
  if (lawyerAuthenticated) {
    if (
      !mongoValidator.isMongoId(req.params.caseId) ||
      (await Case.findById(req.params.caseId)) === null
    )
      return res.status(400).send({ error: "Invalid case id" });
    if (
      req.params.caseStatus !== "OnUpdate" &&
      req.params.caseStatus !== "WaitingForReviewer"
    )
      return res.status(400).send({ error: "Invalid new status" });
    try {
      await Case.findByIdAndUpdate(req.params.caseId, {
        caseStatus: req.params.caseStatus
      });
      res.send({ data: await Case.findById(req.params.caseId) });
    } catch (error) {
      res.status(400).send({
        error: "A fatal error has occured, could not update the case status."
      });
    }
  } else return res.status(403).send({ error: "Forbidden." });
};

// As a lawyer i should be able to see all unsigned cases
exports.getWaitingForLawyerCase = async function(req, res) {
  try {
    if (lawyerAuthenticated) {
      let lawyer = await Lawyer.findById(req.params.id);
      if (lawyer === null) return res.send({ msg: "Lawyer Does Not Exist" });
      let allcases = await Case.where("caseStatus", "WaitingForLawyer");
      res.send({ data: allcases });
    } else res.status(403).send({ error: "Forbidden." });
  } catch (error) {
    res.status(400).send({ error: "An error has occured." });
  }
};

exports.getSpecificWaitingForLawyerCase = async function(req, res) {
  try {
    if (lawyerAuthenticated) {
      let lawyer = await Lawyer.findById(req.params.id);
      if (lawyer === null) return res.send({ error: "Lawyer Does Not Exist" });
      let selectedCase = await Case.where("_id", req.params.caseId);
      if (selectedCase[0].caseStatus === "WaitingForLawyer") {
        selectedCase[0].caseStatus = "AssignedToLawyer";
        selectedCase[0].assignedLawyerId = req.params.id;
        await Case.findByIdAndUpdate(req.params.caseId, selectedCase[0]);
        res.send({ data: await Case.findById(req.params.caseId) });
      } else res.status(403).send({ error: "Case is not supported." });
    } else res.status(403).send({ error: "Forbidden." });
  } catch (error) {
    res.status(400).send({ error: "An error has occured." });
  }
};

exports.loginLawyer = function(req, res, next) {
  passport.authenticate("lawyers", async function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/api/lawyers/login");
    }
    req.logIn(user, async function(err) {
      if (err) {
        return next(err);
      }
      var lawyer = await Lawyer.where("email", req.body.email);
      return res.redirect("/api/lawyers/" + lawyer[0]._id);
    });
  })(req, res, next);
};

exports.updateCompanyForm = async function(req, res) {
  if (
    !mongoValidator.isMongoId(req.params.id) ||
    !mongoValidator.isMongoId(req.params.caseId)
  )
    res.status(403).send({ error: "Invalid IDs" });
  try {
    if (lawyerAuthenticated) {
      let lawyer = await Lawyer.findById(req.params.id);
      if (lawyer === null)
        res.status(403).send({ error: "lawyer Does Not Exist" });
      let selectedCase = await Case.findById(req.params.caseId);
      if (selectedCase === null)
        res.status(403).send({ error: "Case Does Not Exist" });
      if (selectedCase.creatorLawyerId == null) {
        res.status(403).send({ error: "This case can not be updated" });
      }
      if (!(selectedCase.caseStatus === "OnUpdate"))
        res.status(403).send({ error: "This case can not be updated" });

      if (req.params.id == selectedCase.creatorLawyerId) {
        req.params.id = req.params.caseId;
        await caseController.updateCase(req, res);
      } else
        res
          .status(403)
          .send({ error: "Not the lawyer that created this case" });
    } else res.status(403).send({ error: "Forbidden." });
  } catch (error) {
    res.status(400).send({ error: "An error has occured." });
  }
};
// As a Lawyer i should be able to add a comment on a rejected company establishment form
// made by an investor, so that the investor is aware of the required changes in the form.
exports.addCommentAsLawyer = async function(req, res) {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(req.params.lawyerId) ||
      !mongoose.Types.ObjectId.isValid(req.params.caseId)
    )
      return res.status(400).send({ error: "Incorrect Mongo ID" });
    const checkLawyer = await Lawyer.find({ _id: req.params.lawyerId });
    const checkCase = await Case.find({ _id: req.params.caseId });
    if (checkLawyer.length === 0)
      return res.status(404).send({ error: "Lawyer not Found" });
    if (checkCase.length === 0)
      return res.status(404).send({ error: "Case not Found" });
    if (lawyerAuthenticated) {
      if (checkCase[0].assignedLawyerId + "" !== req.params.lawyerId + "")
        return res.status(403).send({
          error: "Only assigned Lawyers to this Case can comment on it"
        });
      if (checkCase[0].caseStatus !== "OnUpdate")
        return res.status(403).send({
          error: "Access Denied: This Case is currently Locked for you."
        });
      if (req.body.body === undefined || req.body.body.length === 0)
        return res.status(403).send({ error: "You can't add empty Comment" });
      checkCase[0].comments.push({
        author: checkLawyer[0].fullName,
        body: req.body.body
      });
      await Case.findByIdAndUpdate(req.params.caseId, {
        comments: checkCase[0].comments
      });
      return res.send({ data: checkCase });
    } else return res.status(403).send({ error: "Forbidden." });
  } catch {
    res.status(400).send({ error: "An error has occured." });
  }
};

exports.getMyCasesByid = async function(req, res) {
  if (!mongoValidator.isMongoId(req.params.id))
    return res.status(400).send({ error: "Invalid lawyer id" });
  const lawyer = await Lawyer.findById(req.params.id);
  if (!lawyer) return res.status(400).send({ error: "Lawyer not found" });
  res.send({
    data: await Case.find({ assignedLawyerId: req.params.id }).sort({ _id: 1 })
  });
};

exports.getMyCasesByDate = async function(req, res) {
  if (!mongoValidator.isMongoId(req.params.id))
    return res.status(400).send({ error: "Invalid lawyer id" });
  const lawyer = await Lawyer.findById(req.params.id);
  if (!lawyer) return res.status(400).send({ error: "Lawyer not found" });
  res.send({
    data: await Case.find({ assignedLawyerId: req.params.id }).sort({
      caseCreationDate: -1
    })
  });
};

exports.forgot = function(req, res, next) {
  async.waterfall(
    [
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          let token = buf.toString("hex");
          done(err, token);
        });
      },
      function(token, done) {
        Lawyer.findOne({ email: req.body.email }, function(err, lawyer) {
          if (!lawyer) {
            req.flash("error", "No account with that email address exists.");
            return res.redirect("/forgot");
          }

          lawyer.resetPasswordToken = token;
          lawyer.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          lawyer.save(function(err) {
            done(err, token, lawyer);
          });
        });
      },
      function(token, user, done) {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "sumergiteme@gmail.com",
            pass: "U-CANT-SE-ME"
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        let mailOptions = {
          to: user.email,
          from: "sumergiteme@gmail.com",
          subject: "Password Reset Request",
          text:
            "Hello " +
            user.fullName +
            ",\n\n" +
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "http://localhost:3000/lawyers/reset/" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n\n" +
            "Do not share this link with anyone.\n"
        };
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
          res.send({ msg: "success" });
        });
      }
    ],
    function(err) {
      if (err) return next(err);
      res.redirect("/forgot");
    }
  );
};

exports.reset = function(req, res) {
  async.waterfall(
    [
      function(done) {
        Lawyer.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
          },
          function(err, user) {
            if (!user) {
              req.flash(
                "error",
                "Password reset token is invalid or has expired."
              );
              return res.redirect("back");
            }

            user.password = encryption.hashPassword(req.body.password);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          }
        );
      },
      function(user, done) {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "sumergiteme@gmail.com",
            pass: "U-CANT-SE-ME"
          },
          tls: {
            rejectUnauthorized: false
          }
        });
        let mailOptions = {
          to: user.email,
          from: "sumergiteme@gmail.com",
          subject: "Your password has been changed",
          text:
            "Hello " +
            user.fullName +
            ",\n\n" +
            "This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n"
        };
        transporter.sendMail(mailOptions, function(err, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
          req.flash("success", "Success! Your password has been changed.");
          done(err);
        });
        res.send({ msg: "success" });
      }
    ],
    function(err) {
      res.redirect("/");
    }
  );
};

exports.requestUpdate = async function(req, res) {
  if (lawyerAuthenticated) {
    if (!mongoValidator.isMongoId(req.params.caseId))
      return res.status(400).send({ error: "Invalid case id" });

    let myCase = await Case.findById(req.params.caseId);

    if (myCase === null)
      return res.status(400).send({ error: "Invalid case id" });

    if (myCase.assignedReviewerId !== null)
      return res
        .status(400)
        .send({ error: "You are not the one required to update" });

    if (
      toString(myCase.assignedLawyerId) !==
      toString(req.params.assignedLawyerId)
    )
      return res.status(400).send({ error: "This is not your case" });

    if (myCase.caseStatus === "OnUpdate")
      return res.status(400).send({ error: "This case is not updated yet" });

    try {
      await Case.findByIdAndUpdate(req.params.caseId, {
        caseStatus: "OnUpdate"
      });
      res.send({ data: await Case.findById(req.params.caseId) });
    } catch (error) {
      res.status(400).send({
        error: "A fatal error has occured, could not update the case status."
      });
    }
  } else return res.status(403).send({ error: "Forbidden." });
};

exports.resumeWorkOnCase = async function(req, res) {
  if (lawyerAuthenticated) {
    if (!mongoValidator.isMongoId(req.params.caseId))
      return res.status(400).send({ error: "Invalid case id" });

    let myCase = await Case.findById(req.params.caseId);

    if (myCase === null)
      return res.status(400).send({ error: "Invalid case id" });

    if (myCase.assignedReviewerId === null)
      return res
        .status(400)
        .send({ error: "You are not the one required to update" });

    if (
      toString(myCase.assignedLawyerId) !==
      toString(req.params.assignedLawyerId)
    )
      return res.status(400).send({ error: "This is not your case" });

    if (myCase.caseStatus !== "OnUpdate")
      return res
        .status(400)
        .send({ error: "This case is not in the update state" });

    try {
      await Case.findByIdAndUpdate(req.params.caseId, {
        caseStatus: "AssignedToReviewer"
      });
      res.send({ data: await Case.findById(req.params.caseId) });
    } catch (error) {
      res.status(400).send({
        error: "A fatal error has occured, could not update the case status."
      });
    }
  } else return res.status(403).send({ error: "Forbidden." });
};
