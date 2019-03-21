const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExternalEntitySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  socket: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = ExternalEntity = mongoose.model("externalEntities", ExternalEntitySchema);