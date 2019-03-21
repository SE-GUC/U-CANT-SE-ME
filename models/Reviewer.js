const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ReviewerSchema= new Schema({
userName: {
type:String,
unique:true,
required: true
},
password: {
type: String,
required: true
},
fullName: {
type: String,
required: true
},
email: {
type:String,
required:true
}
});
module.exports = Reviewer = mongoose.model ('reviewers', ReviewerSchema)