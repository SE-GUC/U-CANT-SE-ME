const Joi = require("joi");
const Investor = require("../models/Investor");
const FormTemplate = require("../models/FormTemplate");
const formTemplateController = require("../controllers/formTemplateController");

module.exports = {
  formCreateValidation: (newCase, formTemplate) => {
    let validation = formTemplateController.validateForm(
      newCase.form,
      formTemplate
    );
    if (validation.error) return validation;

    if (formTemplate.hasManagers) {
      let minVal = formTemplate.managersMinNumber
        ? formTemplate.managersMinNumber
        : 0;
      let maxVal = formTemplate.managersMaxNumber
        ? formTemplate.managersMaxNumber
        : 1000;
      if (newCase.managers.length < minVal || newCase.managers.length > maxVal)
        return {
          error: {
            details: [
              {
                message: `The ${
                  newCase.companyType
                } Form can only have from ${minVal} to ${maxVal} managers!`
              }
            ]
          }
        };
    } else {
      if (newCase.managers.length > 0)
        return {
          error: {
            details: [
              {
                message: `The ${newCase.companyType} Form cannot have managers!`
              }
            ]
          }
        };
    }

    if (formTemplate.rulesFunction) {
      const rulesFunction = formTemplateController.makeRuleFunction(
        formTemplate.rulesFunction
      )();
      const valid = rulesFunction(
        Investor.findById(newCase.creatorInvestorId),
        newCase.form,
        newCase.managers
      );
      if (typeof valid !== "boolean")
        return {
          error: {
            details: [
              {
                message: `The Rules Function doesn't return a boolean. Cannot validate!`
              }
            ]
          }
        };
      if (!valid)
        return {
          error: {
            details: [
              {
                message: `The Case doesn't staisfy the company type rules!`
              }
            ]
          }
        };
    }
    return { success: "The form is valid!" };
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
    for (let i = 0; managers && i < managers.length; i++) {
      validation = Joi.validate(managers[i], managerCreateSchema);
      if (validation.error) return validation;
      if (managers[i].managerNationality === "Egyptian")
        validation = Joi.validate(
          { field: managers[i].managerIdNumber },
          {
            field: Joi.string()
              .trim()
              .regex(/^[0-9]{14}$/)
          }
        );
      if (validation.error) return validation;
    }
    return validation;
  },

  createValidation: request => {
    const caseCreateSchema = {
      caseStatus: Joi.string()
        .valid(["WaitingForLawyer", "WaitingForReviewer"])
        .required(),
      creatorInvestorId: Joi.required(),
      creatorLawyerId: Joi,
      assignedLawyerId: Joi,
      assignedReviewerId: Joi,
      companyType: Joi,
      form: Joi,
      managers: Joi
    };

    //Validate Case data related to the System
    var validation = Joi.validate(request, caseCreateSchema);
    if (validation.error) return validation;

    //Validate Case data related to the Managers
    validation = module.exports.managersCreateValidation(request.managers);
    if (validation && validation.error) return validation;

    const formTemplate = FormTemplate.find({ formName: request.companyType });

    if (!formTemplate)
      return {
        error: {
          details: [
            {
              message: `No such Company type exist!`
            }
          ]
        }
      };
      
    //Validate Case data related to the Form
    validation = module.exports.formCreateValidation(request, formTemplate);
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
    for (let i = 0; managers && i < managers.length; i++) {
      validation = Joi.validate(managers[i], managerUpdateSchema);
      if (validation.error) return validation;
    }
    return validation;
  },

  commentsUpdateValidation: comments => {
    const commentUpdateSchema = {
      author: Joi.string().required(),
      body: Joi.string().required(),
      date: Joi.date()
    };
    var validation;
    for (let i = 0; comments && i < comments.length; i++) {
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

    validation = module.exports.managersUpdateValidation(request.managers);
    if (validation && validation.error) return validation;

    validation = module.exports.commentsUpdateValidation(request.comments);
    if (validation && validation.error) return validation;

    validation = module.exports.formUpdateValidation(request.form);

    return validation;
  }
};
