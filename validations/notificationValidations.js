
const Joi = require('joi')

module.exports = {
        createValidation: request => {
        const createSchema = {
        recipientId: Joi.string().required(),
        emailOfRecipient: Joi.string().email().required(),
        message: Joi.string().required(),
        caseID: Joi.string().required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            message: Joi.string(),
            caseID: Joi.string(),
            emailOfRecipient: Joi.string().email().lowercase(),
            recipientId: Joi.string(),
            dateSeen: Joi.string().isoDate()
        }

        return Joi.validate(request, updateSchema)
    }, 
}