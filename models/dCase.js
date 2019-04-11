const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CaseSchema = new Schema({
  caseStatus: {
    type: String,
    enum: [
      "OnUpdate",
      "WaitingForLawyer",
      "AssignedToLawyer",
      "WaitingForReviewer",
      "AssignedToReviewer",
      "Rejected",
      "Accepted",
      "Established"
    ],
    default: "WaitingForLawyer",
    required: true
  },
  caseCreationDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  creatorInvestorId: {
    type: Schema.Types.ObjectId,
    ref: "investors",
    required: true //can be created by lawyer only?
  },
  creatorLawyerId: {
    type: Schema.Types.ObjectId,
    ref: "lawyers",
    default: null,
    required: false
  },
  assignedLawyerId: {
    type: Schema.Types.ObjectId,
    ref: "lawyers",
    default: null,
    required: false
  },
  assignedReviewerId: {
    type: Schema.Types.ObjectId,
    ref: "reviewers",
    default: null,
    required: false
  },
  comments: {
    type: [
      {
        author: {
          type: String,
          required: true
        },
        body: {
          type: String,
          required: true
        },
        date: {
          type: Date,
          default: Date.now(),
          required: true
        }
      }
    ],
    default: [],
    required: false
  },
  form: {
    companyType: {
      type: String,
      enum: ["SPC", "SSC"],
      required: true
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
      unique: true,
      required: true
    },
    companyNameEnglish: {
      type: String,
      unique: true,
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
    }
  },
  managers: {
    type: [
      {
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
          enum: ["NID", "passport"],
          required: true
        },
        managerIdNumber: {
          type: String,
          required: true
        },
        managerDateOfBirth: {
          type: Date,
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
      }
    ],
    default: [],
    required: true
  }
});

module.exports = Case = mongoose.model("dcases", CaseSchema);
