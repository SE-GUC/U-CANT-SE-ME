const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            investorID: Joi.string().required(),
            lawyerID: Joi.string(),
            companyType: Joi.string().min(3).required(),
            assigneeID: Joi.string(),
            regulatedLaw: Joi.string().required(),
            legalFormOfCompany: Joi.string().required(),
            companyNameArabic: Joi.string().required(),
            companyNameEnglish: Joi.string(),
            headOfficeGovernorate: Joi.string().required(),
            headOfficeCity: Joi.string().required(),
            headOfficeAddress: Joi.string().required(),
            phoneNumber: Joi.string(),
            fax: Joi.string(),
            currencyUsedForCapital: Joi.string().required(),
            capital: Joi.number().required(),
            IDType: Joi.string().required(),
            IDnumber: Joi.number().required(),
            minimumCapitalLimit: Joi.number().required(),
            managerName: Joi.string().required(),
            managerType: Joi.string().required(),
            managerGender: Joi.string().required(),
            managerNationality: Joi.string().required(),
            managerIDType: Joi.string().required(),
            managerIDNumber: Joi.number().required(),
            managerDateOfBirth: Joi.date().required(),
            managerResidenceAdress: Joi.string().required(),
            managerPositionInBoardOfDirectors: Joi.string().required()
        }
        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            caseStatus: Joi.string().required(),
            lawyerID: Joi.string().required(), 
            reviewerID: Joi.string().required(),
            assigneeID: Joi.string().required()
        }

        return Joi.validate(request, updateSchema)
    }, 
}