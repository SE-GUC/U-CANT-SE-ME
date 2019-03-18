const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            userName: Joi.string().min(1).max(500).required(),
            fullName: Joi.string().min(1).max(500).required(),
            password: Joi.string().min(1).max(500).required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            userName: Joi.string().min(1).max(500).required(),
            fullName: Joi.string().min(1).max(500).required(),
            password: Joi.string().min(1).max(500).required()
        }

        return Joi.validate(request, updateSchema)
    }, 
}