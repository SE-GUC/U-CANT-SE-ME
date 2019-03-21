const mongoose =require("mongoose");
const Schema=mongoose.Schema;

const lawyerSchema= new Schema({
fullName: {
type: String,
required: true
},
email :{
type:String,
required:true
},
password:{
type: String,
required:true
},
userName:{
type: String,
required:true 
} 
});
module.exports = Lawyer = mongoose.model('lawyersTestCollection', lawyerSchema)