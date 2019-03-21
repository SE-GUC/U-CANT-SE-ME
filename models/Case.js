const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CaseSchema = new Schema({
  caseStatus: {
    type: String,
    enum: ["OnUpdate", "WaitingForLawyer", "AssignedToLawyer", "WaitingForReviewer", "AssignedToReviewer", "Rejected", "Accepted"], 
    default:'New',
    required: true
  },
  caseCreationDate: {
    type: Date,
    default:Date.now,
    required: true
  },
  creatorInvestorId: {
    type: Schema.Types.ObjectId,
    ref: 'investors',
    required: true //can be created by lawyer only?
  },
  creatorLawyerId: {
    type: Schema.Types.ObjectId,
    ref: 'lawyers',
    default: null,
    required: false
  },
  companyType: {
    type: String,
    required: true
  },
  assignedLawyerId: {
    type: Schema.Types.ObjectId,
    ref: 'lawyers',
    default: null,
    required: false
  },
  assignedReviewerId: {
    type: Schema.Types.ObjectId,
    ref: 'reviewers',
    default: null,
    required: false
  },
  comments: {
    type: [{ author: String, body: String, date: Date }],
    default: [],
    required: false
  },
  //Contact and Decision should be auto-generated
  regulatedLaw: {
    type: String,
    required: true
  },
  legalFormOfCompany: {
    type: String,
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
  headOfficeGovernorate: {
    type: String,
    required: true
  },
  headOfficeCity: {
    type: String,
    required: true
  },
  headOfficeAddress: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  fax: {
    type: String,
    required: false
  },
  currencyUsedForCapital: {
    type: String,
    required: true
  },
  capital: {
    type: Number,
    required: true
  },
  IdType: {
    type: String,
    required: true
  },
  Idnumber: {
    type: Number,
    required: true
  },
  assignedReviewers: {
    type: [Schema.Types.ObjectId],
    default: [],
    required: false
  },
  assignedLawyers: {
    type: [Schema.Types.ObjectId],
    default: [],
    required: false
  },
  minimumCapitalLimit: {
    type: Number,
    required: true
  },
  managerName: {
    type: String,
    required: true
  },
  managerType: {
    type: String,
    required: true
  },
  managerGender: {
      type: String, 
      enum: ["Male", "Female"],
      required: true
  },
  managerNationality: {
    type: String,
    required: true
  },
  managerIdType: {
    type: String,
    required: true
  },
  managerIdNumber: {
    type: Number,
    required: true
  },
  managerDateOfBirth: {
    type: Date,
    default: Date.now,
    required: true
  },
  managerResidenceAddress: {
    type: String,
    required: true
  },
  managerPositionInBoardOfDirectors: {
    type: String,
    required: true
  }
});
module.exports = Case = mongoose.model("cases", CaseSchema);