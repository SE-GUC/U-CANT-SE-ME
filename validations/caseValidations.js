const Joi = require("joi");

module.exports = {

  formCreateValidation: form => {
    const formCreateSchema = {
      companyType: Joi.string()
        .valid(["SPC", "SSC"])
        .required(),
      regulatedLaw: Joi.string().required(),
      legalFormOfCompany: Joi.string().required(),
      companyNameArabic: Joi.string().required(),
      companyNameEnglish: Joi.string(),
      headOfficeGovernorate: Joi.string().required(),
      headOfficeCity: Joi.string().required(),
      headOfficeAddress: Joi.string().required(),
      phoneNumber: Joi.string()
        .trim()
        .regex(/^[0-9]{7,14}$/),
      fax: Joi.string()
        .trim()
        .regex(/^[0-9]{7,10}$/),
      currencyUsedForCapital: Joi.string().required(),
      capital: Joi.number().required()
    };
    return Joi.validate(form, formCreateSchema);
  },

  managersCreateValidation: managers => {
    const now = Date.now();
    const earliestBirthDate = new Date(now - 21 * 365 * 24 * 60 * 60 * 1000);
    const latestBirthDate = new Date(now - 120 * 365 * 24 * 60 * 60 * 1000);
    const managerCreateSchema = {
      managerName: Joi.string().required(),
      managerType: Joi.string().required(),
      managerGender: Joi.string()
        .valid(["Male", "Female"])
        .required(),
      managerNationality: Joi.string().required(),
      managerIdType: Joi.string()
        .valid(["NID", "passport"])
        .required(),
      managerIdNumber: Joi.string().required(),
      managerDateOfBirth: Joi.date()
        .max(earliestBirthDate)
        .required()
        .min(latestBirthDate),
      managerResidenceAddress: Joi.string().required(),
      managerPositionInBoardOfDirectors: Joi.string().required()
    };
    var validation;
    for (let i = 0; i < managers.length; i++) {
      validation = Joi.validate(managers[i], managerCreateSchema);
      if (validation.error) return validation;
    }
    return validation;
  },

  createValidation: request => {
    const caseCreateSchema = {
      caseStatus: Joi.string()
        .valid([
          "OnUpdate",
          "WaitingForLawyer",
          "AssignedToLawyer",
          "WaitingForReviewer",
          "AssignedToReviewer",
          "Rejected",
          "Accepted"
        ])
        .required(),
      creatorInvestorId: Joi.required(),
      creatorLawyerId: Joi,
      assignedLawyerId: Joi,
      assignedReviewerId: Joi,
      form: Joi,
      managers: Joi
    };

    // const caseProprities = (({
    //   caseStatus,
    //   creatorInvestorId,
    //   creatorLawyerId,
    //   assignedLawyerId,
    //   assignedReviewerId
    // }) => ({
    //   caseStatus,
    //   creatorInvestorId,
    //   creatorLawyerId,
    //   assignedLawyerId,
    //   assignedReviewerId
    // }))(request);

    //Validate Case data related to the System
    var validation = Joi.validate(request, caseCreateSchema);
    if (validation.error) return validation;

    //Validate Case data related to the Form
    validation = module.exports.formCreateValidation(request.form);
    if (validation.error) return validation;

    //Validate Case data related to the Managers
    validation = module.exports.managersCreateValidation(request.managers);
    return validation;
  },

  formUpdateValidation: form => {
    const formUpdateSchema = {
      companyType: Joi.string().valid(["SPC", "SSC"]),
      regulatedLaw: Joi.string(),
      legalFormOfCompany: Joi.string(),
      companyNameArabic: Joi.string(),
      companyNameEnglish: Joi.string(),
      headOfficeGovernorate: Joi.string(),
      headOfficeCity: Joi.string(),
      headOfficeAddress: Joi.string(),
      phoneNumber: Joi.string()
        .trim()
        .regex(/^[0-9]{7,14}$/),
      fax: Joi.string()
        .trim()
        .regex(/^[0-9]{7,10}$/),
      currencyUsedForCapital: Joi.string(),
      capital: Joi.number()
    };
    return Joi.validate(form, formUpdateSchema);
  },

  managersUpdateValidation: managers => {
    const now = Date.now();
    const earliestBirthDate = new Date(now - 21 * 365 * 24 * 60 * 60 * 1000);
    const latestBirthDate = new Date(now - 120 * 365 * 24 * 60 * 60 * 1000);
    const managerUpdateSchema = {
      managerName: Joi.string(),
      managerType: Joi.string(),
      managerGender: Joi.string().valid(["Male", "Female"]),
      managerNationality: Joi.string(),
      managerIdType: Joi.string().valid(["NID", "passport"]),
      managerIdNumber: Joi.string(),
      managerDateOfBirth: Joi.date()
        .max(earliestBirthDate)
        .min(latestBirthDate),
      managerResidenceAddress: Joi.string(),
      managerPositionInBoardOfDirectors: Joi.string()
    };
    var validation;
    for (let i = 0; i < managers.length; i++) {
      validation = Joi.validate(managers[i], managerUpdateSchema);
      if (validation.error) return validation;
    }
    return validation;
  },

  commentsUpdateValidation: comments => {
    const commentUpdateSchema = {
      author: Joi.string().required(),
      body: Joi.string().required(),
      date: Joi.Date()
    };
    var validation;
    for (let i = 0; i < comments.length; i++) {
      validation = Joi.validate(comments[i], commentUpdateSchema);
      if (validation.error) return validation;
    }
    return validation;
  },

  updateValidation: request => {
    const updateSchema = {
      caseStatus: Joi.string().valid([
        "OnUpdate",
        "WaitingForLawyer",
        "AssignedToLawyer",
        "WaitingForReviewer",
        "AssignedToReviewer",
        "Rejected",
        "Accepted"
      ]),
      assignedLawyerId: Joi,
      assignedReviewerId: Joi,
      previouslyAssignedLawyers: Joi,
      previouslyAssignedReviewers: Joi,
      form: Joi,
      managers: Joi,
      comments: Joi
    };
    var validation = Joi.validate(request, updateSchema);
    if (validation.error) return validation;

    validation = module.exports.formUpdateValidation(request.form);
    if (validation.error) return validation;

    validation = module.exports.managersUpdateValidation(request.managers);
    if (validation.error) return validation;

    validation = module.exports.commentsUpdateValidation(request.comments);
    return validation;
  }
};
