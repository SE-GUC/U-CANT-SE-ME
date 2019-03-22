const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const now = Date.now();
        const earliestBirthDate = new Date(now - 21 * 365 * 24 * 60 * 60 * 1000);
        const latestBirthDate = new Date(now - 120 * 365 * 24 * 60 * 60 * 1000);
        const createSchema = {
            creatorInvestorId: Joi.required(),
            creatorLawyerId: Joi,
            companyType: Joi.string().required().valid(["SPC","SSC"]),
            assignedLawyerId: Joi,
            assignedReviewerId: Joi,
            regulatedLaw: Joi.string().required(),
            legalFormOfCompany: Joi.string().required(),
            companyNameArabic: Joi.string().required(),
            companyNameEnglish: Joi.string(),
            headOfficeGovernorate: Joi.string().required(),
            headOfficeCity: Joi.string().required(),
            headOfficeAddress: Joi.string().required(),
            phoneNumber: Joi.string().trim().regex(/^[0-9]{7,14}$/),
            fax: Joi.string().regex(/^[0-9]{7,10}$/),
            currencyUsedForCapital: Joi.string().required(),
            capital: Joi.number().required(),
            IdType: Joi.string().required().valid(["SSN","passport"]),
            Idnumber: Joi.number().required(),
            minimumCapitalLimit: Joi.number().required(),
            managerName: Joi.string().required(),
            managerType: Joi.string().required(),
            managerGender: Joi.string().required().valid(["Male","Female"]),
            managerNationality: Joi.string().required(),
            managerIdType: Joi.string().required().valid(["SSN","passport"]),
            managerIdNumber: Joi.number().required(),
            managerDateOfBirth: Joi.date().max(earliestBirthDate).required().min(latestBirthDate),
            managerResidenceAddress: Joi.string().required(),
            managerPositionInBoardOfDirectors: Joi.string().required()
        }
        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            caseStatus: Joi.string().required().valid(["New","OnUpdate", "WaitingForLawyer", "AssignedToLawyer", "WaitingForReviewer", "AssignedToReviewer", "Rejected", "Accepted"]),
            assignedLawyerId: Joi, 
            assignedReviewerId: Joi,
            author: Joi.string(),
            body: Joi.string()
        }

        return Joi.validate(request, updateSchema)
    }, 
}

