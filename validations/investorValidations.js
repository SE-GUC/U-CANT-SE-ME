const Joi = require("joi");

module.exports = {
  createValidation: request => {
    let nationalities = [];
    const allNationalities = require("../data/nationalities.json");
    for(let atr in allNationalities)
      nationalities.push(atr);
    const now = Date.now();
    const earliestBirthDate = new Date(now - 21 * 365 * 24 * 60 * 60 * 1000); //21 years earlier
    const latestBirthDate = new Date(now - 120 * 365 * 24 * 60 * 60 * 1000); //can not be older than 120 years
    const createSchema = {
      email: Joi.string()
        .email()
        .lowercase()
        .required(),
      password: Joi.string()
        .min(8)
        .required(),
      fullName: Joi.string()
        .min(3)
        .required(),
      type: Joi.string().required(), //Input will come from a list. No need for: Joi.any().valid(['a', 'b', 'c']).required()
      gender: Joi.any()
        .valid(["Male", "Female"])
        .required(), //Input will come from a list. No need for: Joi.any().valid(['M', 'F']).required()
      nationality: Joi.string().valid(nationalities).required(), //Input will come from a list
      methodOfIdentification: Joi.string()
        .valid(["NID", "passport"])
        .required(), //Input will come from a list
      identificationNumber: Joi.string().required(),
      dateOfBirth: Joi.date()
        .max(earliestBirthDate)
        .required()
        .min(latestBirthDate),
      residenceAddress: Joi.string().required(),
      telephoneNumber: Joi.string()
        .trim()
        .regex(/^[0-9]{7,14}$/),
      fax: Joi.string()
        .trim()
        .regex(/^[0-9]{7,10}$/)
    };

    if (
      request.nationality === "Egyptian" &&
      request.methodOfIdentification === "NID"
    ) {
      let validation = Joi.validate(
        { identificationNumber: request.identificationNumber },
        {
          identificationNumber: Joi.string()
            .trim()
            .regex(/^[0-9]{14}$/)
        }
      );
      if (validation.error) return validation;
    }

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    let nationalities = [];
    const allNationalities = require("../data/nationalities.json");
    for(let atr in allNationalities)
      nationalities.push(atr);
    const now = Date.now();
    const earliestBirthDate = new Date(now - 21 * 365 * 24 * 60 * 60 * 1000); //21 years earlier
    const latestBirthDate = new Date(now - 120 * 365 * 24 * 60 * 60 * 1000); //can not be older than 120 years
    const updateSchema = {
      email: Joi.string()
        .email()
        .lowercase(),
      password: Joi.string().min(8),
      fullName: Joi.string().min(3),
      type: Joi.string(), //Input will come from a list. No need for: Joi.any().valid(['a', 'b', 'c']).required()
      gender: Joi.any().valid(["Male", "Female"]), //Input will come from a list. No need for: Joi.any().valid(['M', 'F']).required()
      nationality: Joi.string().valid(nationalities), //Input will come from a list
      methodOfIdentification: Joi.string().valid(["NID", "passport"]), //Input will come from a list
      identificationNumber: Joi.string(),
      dateOfBirth: Joi.date()
        .max(earliestBirthDate)
        .min(latestBirthDate),
      residenceAddress: Joi.string(),
      telephoneNumber: Joi.string()
        .trim()
        .regex(/^[0-9]{7,14}$/),
      fax: Joi.string()
        .trim()
        .regex(/^[0-9]{7,10}$/)
    };

    if (
      request.nationality === "Egyptian" &&
      request.methodOfIdentification === "NID"
    ) {
      let validation = Joi.validate(
        { identificationNumber: request.identificationNumber },
        {
          identificationNumber: Joi.string()
            .trim()
            .regex(/^[0-9]{14}$/)
        }
      );
      if (validation.error) return validation;
    }

    return Joi.validate(request, updateSchema);
  }
};
