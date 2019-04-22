const Joi = require("joi");
const Investor = require("../models/Investor");
const FormTemplate = require("../models/FormTemplate");
const formTemplateController = require("../controllers/formTemplateController");

function errorMessage(msg) {
  return {
    error: {
      details: [
        {
          message: msg
        }
      ]
    }
  };
}

module.exports = {
  formValidation: async (newCase, formTemplate, update = false) => {
    if (newCase.form || !update) {
      try {
        let validation = await formTemplateController.validateForm(
          newCase.form,
          formTemplate,
          update
        );
        if (validation.error) return validation;
      } catch (error) {
        return { error: error };
      }
    }

    if (formTemplate.hasManagers && (newCase.managers || !update)) {
      let minVal = formTemplate.managersMinNumber
        ? formTemplate.managersMinNumber
        : 0;
      let maxVal = formTemplate.managersMaxNumber
        ? formTemplate.managersMaxNumber
        : 1000;
      if (newCase.managers.length < minVal || newCase.managers.length > maxVal)
        return errorMessage(
          `The ${
            newCase.companyType
          } Form can only have from ${minVal} to ${maxVal} managers!`
        );
    } else {
      if (newCase.managers && newCase.managers.length > 0)
        return errorMessage(
          `The ${newCase.companyType} Form cannot have managers!`
        );
    }

    if (formTemplate.rulesFunction && !update) {
      let validation = await formTemplateController.validateRules(
        formTemplate,
        newCase
      );
      if (validation.error) return validation;
    }
    return { success: "The form is valid!" };
  },

  managersValidation: managers => {
    const now = Date.now();
    const earliestBirthDate = new Date(now - 21 * 365 * 24 * 60 * 60 * 1000);
    const latestBirthDate = new Date(now - 120 * 365 * 24 * 60 * 60 * 1000);
    const managerSchema = {
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
      validation = Joi.validate(managers[i], managerSchema);
      if (validation.error) return validation;
      if (
        managers[i].managerNationality === "Egyptian" &&
        managers[i].managerIdType === "NID"
      )
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

  createValidation: async request => {
    const caseCreateSchema = {
      caseStatus: Joi.string()
        .valid(["WaitingForLawyer", "WaitingForReviewer"])
        .required(),
      creatorInvestorId: Joi.required(),
      creatorLawyerId: Joi,
      companyType: Joi.required(),
      form: Joi.required(),
      managers: Joi
    };

    //Validate Case data related to the System
    var validation = Joi.validate(request, caseCreateSchema);
    if (validation.error) return validation;

    //Validate Case data related to the Managers
    validation = module.exports.managersValidation(request.managers);
    if (validation && validation.error) return validation;

    const formTemplate = await FormTemplate.findOne({
      formName: request.companyType
    });

    if (!formTemplate) return errorMessage("No such Company type exist!");

    //Validate Case data related to the Form
    validation = await module.exports.formValidation(request, formTemplate);
    return validation;
  },

  commentsValidation: comments => {
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

  rulesValidation: async (request, companyType) => {
    const formTemplate = await FormTemplate.findOne({
      formName: companyType
    });
    if (!formTemplate) return errorMessage("No such Company type exist!");

    if (formTemplate.rulesFunction) {
      let validation = await formTemplateController.validateRules(
        formTemplate,
        request
      );
      if (validation.error) return validation;
    }
    return { success: "The form is valid!" };
  },

  updateValidation: async (request, companyType) => {
    const updateSchema = {
      caseStatus: Joi.string().valid([
        "OnUpdate",
        "WaitingForLawyer",
        "AssignedToLawyer",
        "WaitingForReviewer",
        "AssignedToReviewer",
        "Rejected",
        "Accepted",
        "Established"
      ]),
      assignedLawyerId: Joi,
      assignedReviewerId: Joi,
      form: Joi,
      managers: Joi,
      comments: Joi
    };
    var validation = Joi.validate(request, updateSchema);
    if (validation.error) return validation;

    validation = module.exports.managersValidation(request.managers);
    if (validation && validation.error) return validation;

    validation = module.exports.commentsValidation(request.comments);
    if (validation && validation.error) return validation;

    const formTemplate = await FormTemplate.findOne({
      formName: companyType
    });

    if (!formTemplate) return errorMessage("No such Company type exist!");

    //Validate Case data related to the Form
    validation = await module.exports.formValidation(
      request,
      formTemplate,
      true
    );
    return validation;
  }
};
