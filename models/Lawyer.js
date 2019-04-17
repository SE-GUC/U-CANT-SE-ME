const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lawyerSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

module.exports = Lawyer = mongoose.model("Lawyer", lawyerSchema);
