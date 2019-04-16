const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  socialInsuranceNumber: {
    type: String,
    required: true
  },
  investorId: {
    type: Schema.Types.ObjectId,
    ref: "investors",
    required: true
  },
  companyNameArabic: {
    type: String,
    required: true
  },
  companyNameEnglish: {
    type: String,
    required: false
  },
  companyType: {
    type: String,
    required: true
  },
  dateOfCreation: {
    type: Date,
    default: Date.now,
    required: true
  },
  caseId: {
    type: Schema.Types.ObjectId,
    ref: "cases",
    required: true
  },
  description: {
    type: String,
    required: false
  }
});

module.exports = Company = mongoose.model("Company", CompanySchema);
