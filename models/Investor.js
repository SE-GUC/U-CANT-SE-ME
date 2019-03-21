const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvestorSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  type: {  //Will be a droplist with probably 1 item
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  methodOfIdentification: { //Passport or National id
    type: String,
    required: true
  },
  identificationNumber: {
    type: String,
    unique: true,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  residenceAddress: {
    type: String,
    required: true
  },
  telephoneNumber: {
    type: String,
    required: false
  },
  fax: {
    type: String,
    required: false
  }
});

module.exports = Investor = mongoose.model("investors", InvestorSchema);
