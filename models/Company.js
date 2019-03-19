const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = new Schema({
  socialInsuranceNumber: {
      type: Number,
      required: true
  },
  investorID: {
    //  type : String, 
     type: Schema.Types.ObjectId, 
     ref: 'investors',
     required: true
  },
  companyName: {
      type: String,
      required: true
  },
  companyType: {
      type: String,
      required: true
  },
  dateOfCreation: {
      type: Date,
      required: true
  },
  caseID: {
    //   type: String,
      type: Schema.Types.ObjectId, 
	  ref: 'cases',
      required: true
  }
})

module.exports = Company = mongoose.model('companies', CompanySchema)
