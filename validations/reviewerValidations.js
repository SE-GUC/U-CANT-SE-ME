const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            userName: Joi.string().min(1).max(100).required(),
            password: Joi.string().min(5).max(100).required(),
            fullName: Joi.string().min(3).max(150).required(),
            email: Joi.string().email().max(100).required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            userName: Joi.string().min(1).max(100),
            password: Joi.string().min(5).max(100),
            fullName: Joi.string().min(3).max(150),
            email: Joi.string().email().max(100),
            oldPassword:Joi.string().min(5).max(100)
        }

        return Joi.validate(request, updateSchema)
    }, 
}