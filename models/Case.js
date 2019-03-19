const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CaseSchema = new Schema({
  caseStatus: {
    type: String,
    default:'New',
    required: true
  },
  caseCreationDate: {
    type: Date,
    default:Date.now,
    required: true
  },
  investorID: {
   // type: { type: Schema.Types.ObjectId, ref: 'investors' },
    //type: Schema.Types.ObjectId,
    type: String,
    ref: 'investors',
    required: true
  },
  lawyerID: {
    //type: { type: Schema.Types.ObjectId, ref: 'lawyers' },
    //type: Schema.Types.ObjectId,
    type: String,
    ref: 'lawyers',
    required: false
  },
  companyType: {
    type: String,
    enum : ['SPC','SSC'],
    required: true
  },
  assigneeID: {
    //type: Schema.Types.ObjectId,
    type: String,
    refPath: 'user',
    default: null,
    required: false
  },
  user: {
    type: String,
    required: false,
    enum: ['lawyers', 'reviewers']
  },
  comments: {
    type: [{ body: String, date: Date }],
    default: [],
    required: false
  },
  contract: {
    type: String,
    default: '',
    required: false
  },
  decision: {
    type: String,
    default: '',
    required: false
  },
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
  IDType: {
    type: String,
    required: true
  },
  IDnumber: {
    type: Number,
    required: true
  },
  assignedReviewers: {
    type: [{ body: String}],
    default: [],
    required: false
  },
  assignedLawyers: {
    type: [{ body: String}],
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
  managerIDType: {
    type: String,
    required: true
  },
  managerIDNumber: {
    type: Number,
    required: true
  },

  managerDateOfBirth: {
    type: Date,
    default: Date.now,
    required: true
  },
  managerResidenceAdress: {
    type: String,
    required: true
  },
  managerPositionInBoardOfDirectors: {
    type: String,
    required: true
  }
});
module.exports = Case = mongoose.model("cases", CaseSchema);