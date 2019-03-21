const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    emailOfRecipient: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  caseID: {
    type: Schema.Types.String, 
    refPath: 'cases',
    required: true
   },
  recipientID: {
    type: Schema.Types.String,
    refPath: 'investors',
    required: true
  },
  dateSent: { // not sent as a paramater
    type: Date,
    required: false,
    default: new Date()
},
  user: {
    type: String,
    required: false,
    enum: ['lawyers', 'investors']
  }, 
  dateSeen: { // only in updates
    type: Date,
    required: false
  }
});

module.exports = Notification = mongoose.model("notifications", NotificationSchema);