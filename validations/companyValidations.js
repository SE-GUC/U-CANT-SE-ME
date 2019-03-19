const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
          socialInsuranceNumber: Joi.number().required(),
          investorID: Joi.string().required(),
          companyType: Joi.string().min(3).required(),
          companyStatus: Joi.string().min(3).required(),
          dateOfCreation: Joi.date().required(),
          companyName: Joi.string().min(3).required(),
          caseID: Joi.string().required()
        }
        return Joi.validate(request, createSchema)
    },

    updateValidationParams: request => {
        const updateSchemaParams = {
          companyName: Joi.string().min(3).required()
            //companyStatus: Joi.string().min(3),
            //newCompanyName: Joi.string().min(3)
        }
        return Joi.validate(request, updateSchemaParams)
    }, 

    updateValidationBody: request => {
        const updateSchemaBody = {
          newCompanyName : Joi.string().min(3),
          newCompanyStatus : Joi.string().min(3)
        }
        return Joi.validate(request, updateSchemaBody)
    }
}