const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            creatorInvestorId: Joi.required(),
            creatorLawyerId: Joi,
            companyType: Joi.string().min(3).required(),
            assignedLawyerId: Joi,
            assignedReviewerId: Joi,
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
            IdType: Joi.string().required(),
            Idnumber: Joi.number().required(),
            minimumCapitalLimit: Joi.number().required(),
            managerName: Joi.string().required(),
            managerType: Joi.string().required(),
            managerGender: Joi.string().required(),
            managerNationality: Joi.string().required(),
            managerIdType: Joi.string().required(),
            managerIdNumber: Joi.number().required(),
            managerDateOfBirth: Joi.date().required(),
            managerResidenceAddress: Joi.string().required(),
            managerPositionInBoardOfDirectors: Joi.string().required()
        }
        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            caseStatus: Joi.string().required(),
            assignedLawyerId: Joi, 
            assignedReviewerId: Joi,
            author: Joi.string(),
            body: Joi.string()
        }

        return Joi.validate(request, updateSchema)
    }, 
}