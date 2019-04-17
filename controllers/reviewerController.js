const mongoose = require("mongoose");
const validator = require("../validations/reviewerValidations");

const mongoValidator = require("validator");
const Investor = require("../models/Investor");
const Lawyer = require("../models/Lawyer");
const Reviewer = require("../models/Reviewer");
const reviewerGettingAllCasesAuthenticated = true;
const caseController = require("./caseController");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const tokenKey = require("../config/keys_dev").secretOrKey;
const encryption = require("../routes/api/utils/encryption");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const async = require("async");
// module Case
const Case = require("../models/Case.js");

const reviewerAuthenticated = true;

//Read
exports.getAllReviewers = async function(req, res) {
  const reviewers = await Reviewer.find();
  res.send({ data: reviewers });
};

exports.getReviewer = async function(req, res) {
  var reviewerID = req.params.id;
  if (!mongoValidator.isMongoId(reviewerID))
    return res.status(404).send({ error: "Invalid ID" });
  const neededReviewer = await Reviewer.findById(reviewerID);
  if (!neededReviewer)
    return res.status(404).send({ error: "Reviewer does not exist" });
  res.send({ data: neededReviewer });
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
exports.createReviewer = async function(req, res) {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });

    const isUniqueEmail = await checkUniqueEmail(req.body.email);
    if (!isUniqueEmail)
      return res
        .status(400)
        .send({ error: `email ${req.body.email} is already taken!` });

    const newReviewer = await Reviewer.create(req.body);
    res.send({ msg: "Reviewer was created successfully", data: newReviewer });
  } catch (error) {
    return res
      .status(404)
      .send({ error: "There is a user with this user name" });
  }
};

//Update
exports.updateReviewer = async function(req, res) {
  const reviewerId = req.params.id;
  if (!mongoValidator.isMongoId(reviewerId))
    return res.status(404).send({ error: "Invalid ID" });
  var reviewer = await Reviewer.findById(reviewerId);
  if (!reviewer)
    return res.status(404).send({ error: "Reviewer does not exist" });
  // const oldPassword = req.body.oldPassword;
  try {
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });

    // if (!oldPassword)
    //   return res.status(404).send({ error: "There is no verificaiton" });
    // if (!(reviewer.password == oldPassword)) {
    //   return res.status(404).send({ error: "password doesnot match" });
    // } else {
    if (req.body.username) var username = req.body.username;
    else username = reviewer.username;
    if (req.body.fullName) var fullName = req.body.fullName;
    else fullName = reviewer.fullName;
    if (req.body.password) var password = req.body.password;
    else password = reviewer.password;
    if (req.body.email) var email = req.body.email;
    else email = reviewer.email;
    reviewer = await Reviewer.findByIdAndUpdate(reviewerId, {
      username,
      fullName,
      password,
      email
    });
    res.send({ msg: "Reviewer updated successfully" });
    // }
  } catch (error) {
    return res.status(404).send({ error: "Reviewer does not exist" });
  }
};

//Delete
exports.deleteReviewer = async function(req, res) {
  try {
    const reviewerId = req.params.id;
    if (!mongoValidator.isMongoId(reviewerId))
      return res.status(404).send({ error: "Invalid ID" });
    const deletedReviewer = await Reviewer.findByIdAndRemove(reviewerId);
    if (!deletedReviewer)
      return res.status(404).send({ error: "Reviewer does not exist" });
    res.send({
      msg: "Reviewer was deleted successfully",
      data: deletedReviewer
    });
  } catch (error) {
    return res.status(400).send({ error: "Something went wrong!" });
  }
};

exports.GetAllCases = async function(req, res) {
  try {
    if (reviewerGettingAllCasesAuthenticated) {
      await caseController.getAllCases(req, res);
    } else {
      res
        .status(404)
        .send({ error: "something wrong happened check your identity" });
    }
  } catch {
    res
      .status(404)
      .send({ error: "something wrong happened check your identity" });
  }
};

//as a reviewer i should be able to view all my due tasks

//As a reviewer I should be able to accept or reject a company establishment form
exports.viewTasks = async function(req, res) {
  try {
    if (reviewerAuthenticated) {
      let reviewerCases = await Case.where({
        assignedReviewerId: req.params.reviewerId,
        caseStatus: "AssignedToReviewer"
      });

      if (reviewerCases !== undefined && reviewerCases.length > 0)
        res.send({ Tasks: reviewerCases });
      else res.status(404).send({ error: "Data Not Found" });
    } else return res.status(403).send({ error: "Forbidden." });
  } catch (error) {
    res.send({ error: "An error has occured." });
  }
};
// Accept Reject Form
exports.acceptRejectForm = async function(req, res) {
  if (reviewerAuthenticated) {
    if (
      !mongoValidator.isMongoId(req.params.caseId) ||
      (await Case.findById(req.params.caseId)) === null
    )
      return res.status(400).send({ error: "Invalid case id" });
    if (
      req.params.caseStatus !== "OnUpdate" &&
      req.params.caseStatus !== "Accepted"
    )
      return res.status(400).send({ error: "Invalid new status" });
    try {
      await Case.findByIdAndUpdate(req.params.caseId, {
        caseStatus: req.params.caseStatus
      });
      res.send({ data: await Case.findById(req.params.caseId) });
    } catch (error) {
      res.send({
        error: "A fatal error has occured, could not update the case status."
      });
    }
  } else return res.status(403).send({ error: "Forbidden." });
};

// As a reviewer i should be able to see all unsigned cases
exports.getWaitingForReviewerCase = async function(req, res) {
  try {
    if (reviewerAuthenticated) {
      let reviewerExists = await Reviewer.findById(req.params.id);
      if (reviewerExists === null)
        return res.send(400).send({ error: "Reviewer Does Not Exist" });
      let allcases = await Case.where("caseStatus", "WaitingForReviewer");
      res.send({ data: allcases });
    } else res.status(403).send({ error: "Forbidden." });
  } catch (error) {
    res.send({ error: "An error has occured." });
  }
};

//as a reviewer i should be able to assign myself an unsigned case
exports.getSpecificWaitingForReviewerCase = async function(req, res) {
  try {
    if (reviewerAuthenticated) {
      let reviewer = await Reviewer.findById(req.params.id);
      if (reviewer === null)
        return res.send({ error: "Reviewer Does Not Exist" });
      let selectedCase = await Case.where("_id", req.params.caseId);
      if (selectedCase[0].caseStatus === "WaitingForReviewer") {
        selectedCase[0].caseStatus = "AssignedToReviewer";
        selectedCase[0].assignedReviewerId = req.params.id;
        await Case.findByIdAndUpdate(req.params.caseId, selectedCase[0]);
        res.send({ data: await Case.findById(req.params.caseId) });
      } else res.status(403).send({ error: "Case is not supported." });
    } else res.status(403).send({ error: "Forbidden." });
  } catch (error) {
    res.send({ error: "An error has occured." });
  }
};

exports.loginReviewer = function(req, res, next) {
  passport.authenticate("reviewers", async function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, async function(err) {
      if (err) {
        return next(err);
      }
      var reviewer = await Reviewer.where("email", req.body.email);
      // const payload = {
      //   id : reviewer[0]._id,
      //   email : reviewer[0].email
      // }
      // const token = jwt.sign(payload, tokenKey,{expiresIn:'1h'})
      // res.json({data : `${token}`})
      // return res
      return res.redirect("/api/reviewers/" + reviewer[0]._id);
    });
  })(req, res, next);
};

//As a Reviewer i should be able to add a comment on a rejected company establishment-
//form, so that the lawyer is aware of the required changes in the form.
exports.addCommentAsReviewer = async function(req, res) {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(req.params.reviewerId) ||
      !mongoose.Types.ObjectId.isValid(req.params.caseId)
    )
      return res.status(400).send({ error: "Incorrect Mongo ID" });
    const checkReviewer = await Reviewer.find({ _id: req.params.reviewerId });
    const checkCase = await Case.find({ _id: req.params.caseId });
    if (checkReviewer.length === 0)
      return res.status(404).send({ error: "Reviewer not Found" });
    if (checkCase.length === 0)
      return res.status(404).send({ error: "Case not Found" });
    if (reviewerAuthenticated) {
      if (checkCase[0].assignedReviewerId + "" !== req.params.reviewerId + "")
        return res.status(403).send({
          error: "Only assigned Reviewers to this Case can comment on it"
        });
      if (checkCase[0].caseStatus !== "OnUpdate")
        return res.status(403).send({
          error: "Access Denied: This Case is currently Locked for you."
        });
      if (req.body.body === undefined || req.body.body.length === 0)
        return res.status(403).send({ error: "You can't add empty Comment" });
      checkCase[0].comments.push({
        author: checkReviewer[0].fullName,
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
    return res.status(400).send({ error: "Invalid reviewer id" });
  const reviewer = await Reviewer.findById(req.params.id);
  if (!reviewer) return res.status(400).send({ error: "Reviewer not found" });
  res.send({
    data: await Case.find({ assignedReviewerId: req.params.id }).sort({
      _id: 1
    })
  });
};

exports.getMyCasesByDate = async function(req, res) {
  if (!mongoValidator.isMongoId(req.params.id))
    return res.status(400).send({ error: "Invalid reviewer id" });
  const reviewer = await Reviewer.findById(req.params.id);
  if (!reviewer) return res.status(400).send({ error: "Reviewer not found" });
  res.send({
    data: await Case.find({ assignedReviewerId: req.params.id }).sort({
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
        Reviewer.findOne({ email: req.body.email }, function(err, reviewer) {
          if (!reviewer) {
            req.flash("error", "No account with that email address exists.");
            return res.redirect("/forgot");
          }

          reviewer.resetPasswordToken = token;
          reviewer.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          reviewer.save(function(err) {
            done(err, token, reviewer);
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
            "http://localhost:3000/reviewers/reset/" +
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
        Reviewer.findOne(
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
  if (reviewerAuthenticated) {
    if (!mongoValidator.isMongoId(req.params.caseId))
      return res.status(400).send({ error: "Invalid case id" });

    let myCase = await Case.findById(req.params.caseId);

    if (myCase === null)
      return res.status(400).send({ error: "Invalid case id" });

    if (myCase.assignedLawyerId === null)
      return res
        .status(400)
        .send({ error: "You are not the one required to update" });

    if (
      toString(myCase.assignedReviewerId) !==
      toString(req.params.assignedReviewerId)
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
      res.send({
        error: "A fatal error has occured, could not update the case status."
      });
    }
  } else return res.status(403).send({ error: "Forbidden." });
};
