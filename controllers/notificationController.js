// Dependencies
const mongoose = require("mongoose");
const validator = require("../validations/notificationValidations");
const idValidator = require("validator");
const axios = require("axios");
const nodemailer = require("nodemailer");
// Models
const Notification = require("../models/Notification");
const Investor = require("../models/Investor");
const Reviewer = require("../models/Reviewer");
const Lawyer = require("../models/Lawyer");
const Case = require("../models/Case");

const caseController = require("./caseController");

// Get all notifications
exports.getAllNotifications = async function(req, res) {
  try {
    const notifications = await Notification.find();
    res.send({ data: notifications });
  } catch (error) {
    res.status(404).send({ error: "Something went wrong!" });
  }
};

// Get notification by ID
exports.getNotificationById = async function(req, res) {
  const notificationId = req.params.id;
  if (idValidator.isMongoId(notificationId)) {
    try {
      const notification = await Notification.findById(notificationId);
      if (notification) res.send({ data: notification });
      else res.status(404).send({ error: "Notification Not Found" });
    } catch (error) {
      res.status(400).send({ error: "ErrorOcurred" });
    }
  } else {
    res.status(400).send({ error: "InvalidID" });
  }
};

// create a notification
exports.createNotification = async function(req, res) {
  try {
    const isValidated = validator.createValidation(req.body);

    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const recipientId = req.body.recipientId;
    const caseId = req.body.caseId;
    if (!idValidator.isMongoId(recipientId) || !idValidator.isMongoId(caseId))
      res.status(400).send({ error: "invalidIdformat" });
    else {
      const tmpInvestor = await Investor.findById(recipientId);
      const tmpLawyer = await Lawyer.findById(recipientId);
      const tmpCase = await Case.findById(caseId);
      if ((tmpInvestor || tmpLawyer) && tmpCase) {
        const newNotification = await Notification.create(req.body);
        res.send({
          msg: "Notification was created successfully",
          data: newNotification
        });
      } else {
        if (!tmpCase) res.status(400).send({ error: "CaseNotFound" });
        else res.status(400).send({ error: "RecipientNotFound" });
      }
    }
  } catch (error) {
    res.status(400).send({ error: "Error Ocurred" });
  }
};

// delete a notification
exports.deleteNotification = async function(req, res) {
  const notificationId = req.params.id;
  if (!idValidator.isMongoId(notificationId))
    res.status(400).send({ error: "Invalid ID" });
  else {
    try {
      const deletedNotification = await Notification.findByIdAndRemove(
        notificationId
      );
      if (deletedNotification)
        res.send({
          msg: "Notification was deleted successfully",
          data: deletedNotification
        });
      else res.status(404).send({ error: "notification does not exist" });
    } catch (error) {
      res.status(400).send({ error: "Error Ocurred" });
    }
  }
};

exports.updateNotification = async function(req, res) {
  const id = req.params.id;

  if (!idValidator.isMongoId(id)) res.status(404).send({ error: "Invalid ID" });
  else {
    try {
      const isValidated = validator.updateValidation(req.body);
      if (isValidated.error)
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      const caseId = req.body.caseId;
      const recipientId = req.body.recipientId;
      let ok = true;
      if (caseId) {
        if (!idValidator.isMongoId(caseId)) {
          res.status(400).send({ error: "invalidformat" });
          ok = false;
        } else {
          const tmpCase = await Case.findById(caseId);
          if (!tmpCase) {
            ok = false;
            res.status(404).send({ msg: "CaseNotFound" });
          }
        }
      }
      if (recipientId && ok) {
        if (idValidator.isMongoId(recipientId)) {
          const tmpInvestor = await Investor.findById(recipientId);
          const tmpLawyer = await Lawyer.findById(recipientId);
          if (tmpInvestor || tmpLawyer) {
            const oldNotification = await Notification.findByIdAndUpdate(
              id,
              req.body
            );

            if (!oldNotification)
              return res
                .status(404)
                .send({ error: "notification does not exist" });
            const newNotification = await Notification.findById(id);

            res.send({
              msg: "Notification updated successfully",
              data: newNotification
            });
          } else {
            res.status(404).send({ error: "RecipientNotFound" });
          }
        } else {
          res.status(400).send({ error: "invalidformat" });
        }
      } else if (ok) {
        const oldNotification = await Notification.findByIdAndUpdate(
          id,
          req.body
        );

        if (!oldNotification)
          return res.status(404).send({ error: "notification does not exist" });
        const newNotification = await Notification.findById(id);

        res.send({
          msg: "Notification updated successfully",
          data: newNotification
        });
      }
    } catch (error) {
      res.status(400).send({ error: "Error Ocurred" });
    }
  }
};

exports.notifyInvestorByFees = async function(case1, req) {
  const recipientId = case1.creatorInvestorId;
  const investor = await Investor.findById(recipientId);
  const fees = caseController.calcFees(case1);
  const message =
    "Dear " +
    investor.fullName +
    " , your request for company " +
    case1.form.companyNameEnglish +
    " has been accepted and you are required to pay the fees " +
    fees;
  const email = investor.email;

  req = {
    recipientId: recipientId,
    message: message,
    emailOfRecipient: email,
    caseId: case1._id
  };
  const notification = await axios.post(
    "http://localhost:3000/api/notifications/",
    req
  );
  const reviewer = await Reviewer.findById(case1.assignedReviewerId);

  sendMail(notification.data.data, reviewer);
  return notification;
};
function sendMail(notification, reviewer) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // user: 'sumergiteme@gmail.com',
      user: reviewer.email,
      // pass: 'U-CANT-SE-ME'
      pass: reviewer.password
    }
  });

  var mailOptions = {
    // from: 'sumergiteme@gmail.com',
    from: reviewer.email,
    // to: 'zeyad.khattab97@gmail.com',
    to: notification.emailOfRecipient,
    subject: "Company Request Accepted",
    text: notification.message
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
