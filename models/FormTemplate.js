const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormTemplateSchema = new Schema({
  formName: {
    type: String,
    unique: true,
    required: true
  },
  fields: {
    type: [
      {
        fieldName: {
          type: String,
          required: true
        },
        fieldType: {
          type: String,
          enum: [
              "TEXT",
              "NUMBER",
              "TEXT_NUMBER",
              "DATE",
              "GOVERNATE",
              "CITY",
              "CURRENCY",
              "NATIONALITY",
              "MANAGER"
          ],
          required: true
        },
        isRequired: Boolean,
        isUnique: Boolean,
        minVal: Number,
        maxVal: Number,
      }
    ],
    required: true
  },
  rules : String
});

module.exports = FormTemplate = mongoose.model(
  "formtemplates",
  FormTemplateSchema
);
