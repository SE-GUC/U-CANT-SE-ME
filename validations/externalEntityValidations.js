const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().min(3).max(200).required(),
            description: Joi.string().max(1000),
            socket: Joi.string().required()
        }
        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
          name: Joi.string().min(3).max(200),
          description: Joi.string().max(1000),
          socket: Joi.string()
        }
        return Joi.validate(request, updateSchema)
    }, 
}