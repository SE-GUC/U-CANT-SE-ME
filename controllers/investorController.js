const mongoose = require("mongoose");
const mongoValidator = require("validator");

const Investor = require("../models/Investor");
const validator = require("../validations/investorValidations");
const Case = require("../models/Case.js");
const investorAuthenticated = true;
const caseController = require("../controllers/caseController");
//READ
exports.getAllInvestors = async function(req, res) {
  const investors = await Investor.find();
  res.send(investors);
};

exports.getInvestor = async function(req, res) {
  if (!mongoValidator.isMongoId(req.params.id))
    return res.status(400).send({ err: "Invalid Investor Id" });
  const investor = await Investor.findById(req.params.id);
  if (!investor) return res.status(404).send("Investor not Found");
  res.send(investor);
};

//CREATE
exports.createInvestor = async function(req, res) {
  const { error } = validator.createValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (
    req.body.nationality === "Egyptian" &&
    req.body.identificationNumber.length != 14
  )
    return res.status(400).send("Incorrect National ID number");
  try {
    const investor = await Investor.create(req.body);
    res.send(investor);
  } catch (err) {
    res.send({ msg: "Oops something went wrong" });
    console.log(err);
  }
};

//UPDATE
exports.updateInvestor = async function(req, res) {
  if (!mongoValidator.isMongoId(req.params.id))
    return res.status(400).send({ err: "Invalid Investor Id" });
  const investor = await Investor.findById(req.params.id);
  if (!investor) return res.status(404).send("Investor not Found");

  if (!req.body.email) req.body.email = investor.email;

  if (!req.body.password) req.body.password = investor.password;

  if (!req.body.fullName) req.body.fullName = investor.fullName;

  if (!req.body.type) req.body.type = investor.type;

  if (!req.body.gender) req.body.gender = investor.gender;

  if (!req.body.nationality) req.body.nationality = investor.nationality;

  if (!req.body.methodOfIdentification)
    req.body.methodOfIdentification = investor.methodOfIdentification;

  if (!req.body.identificationNumber)
    req.body.identificationNumber = investor.identificationNumber;

  if (!req.body.dateOfBirth) req.body.dateOfBirth = investor.dateOfBirth;

  if (!req.body.residenceAddress)
    req.body.residenceAddress = investor.residenceAddress;

  if (!req.body.telephoneNumber)
    req.body.telephoneNumber = investor.telephoneNumber;

  if (!req.body.residenceAddress) req.body.fax = investor.fax;

  if (
    req.body.nationality === "Egyptian" &&
    req.body.identificationNumber.length != 14
  )
    return res.status(400).send("Incorrect National ID number");

  const { error } = validator.updateValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await Investor.findByIdAndUpdate(req.params.id, req.body);
    res.send({ msg: "Investor updated successfully" });
  } catch (err) {
    res.send({ msg: "Oops something went wrong" });
    console.log(err);
  }
};

exports.deleteInvestor = async function(req, res) {
  try {
    if (!mongoValidator.isMongoId(req.params.id))
      return res.status(400).send({ err: "Invalid Investor Id" });
    const investor = await Investor.findByIdAndRemove(req.params.id);
    if (!investor) return res.status(404).send("Investor doesn't exist");
    res.send(investor);
  } catch (err) {
    res.send({ msg: "Oops something went wrong" });
    console.log(err);
  }
};

exports.viewLawyerComments = async function(req,res){
  try{
    //if the user is authenticated give them access to the function otherwise return a Forbidden error
    if(investorAuthenticated){
      //querying to find a Case where _id=caseID && creatorInvestorId=investorID
      let caseForForm = await Case.find({"_id":req.params.caseID,"creatorInvestorId":req.params.investorID})
      //if the query brings back a valid result set return its comments otherwise return an error
      if(caseForForm!==undefined && caseForForm.length>0)
        res.json({comments: caseForForm[0].comments})
      else
        res.status(404).send({error: "Data Not Found"})           
    }
    else
      return res.status(403).send({error: "Forbidden." })
  }
  catch(error){
    console.log(error)
    res.json({msg: "An error has occured."})
  }
};


exports.trackMyCompany = async function(req,res){
  try{
    if(!mongoValidator.isMongoId(req.params.id))
  return res.status(400).send({ err : "Invalid Investor Id" })

  const investor = await Investor.findById(req.params.id);
  if(!investor){
    res.json({error:"investor not found"});
    return;
  }

  const cases = await Case.find()

  const creatorInvestorId = req.params.id;
    flag = 0;
    message="";
    let result=[];
    for (let i = 0; i < cases.length; i++) {

      if (String(cases[i].creatorInvestorId) === creatorInvestorId){  
        // slash is added for now as delimiter so we can separate them in front end later  
        result.push({company:" Your company "+cases[i].companyNameEnglish+" is currently in phase "+cases[i].caseStatus+" "} ) 
        flag=1;
      }
    }

     if(flag==0){
       result.push({message:"You did not fill any establishment request yet."} )  
     }

    res.json({"tracking": result});
    
  }
  catch(error){
    console.log(error)
    res.json({msg: "An error has occured."})
  }
};
// As an Investor, I should be able to view my fees
exports.viewMyFees = async function(req,res){
  const id=req.params.id;
  if(!mongoValidator.isMongoId(id)){
      res.json({error:"invalid ID format"});
      return;
  }
  const investor = await Investor.findById(id);
  if(!investor){
    res.json({error:"investor not found"});
    return;
  }
  const cases = await Case.find({"creatorInvestorId":id,"caseStatus":"Accepted"})


 
  let result=[];
  for (let i = 0; i < cases.length; i++) {
        const fees=calcFees(cases[i]);
        result.push({companyName:cases[i].form.companyNameEnglish,fees:fees} )
    }
    if(result.length==0)
      res.json({"response": "you do not have any accepted company requests"})
    else
      res.json({"response": result}); 

    function calcFees(case1) {
      if(case1.form.regulatedLaw.includes("72")){
          return 610;
        }
        const capital=case1.form.capital;
        let ans=56;
        ans+= Math.min(1000,Math.max(100,capital/1000.0));
        ans+= Math.min(1000,Math.max(10,capital/400.0));
        return ans;
     }

};
exports.fillForm = async function(req,res){
  try {
    if (investorAuthenticated) {
      req.body.creatorInvestorId = req.params.investorId;
      caseController.createCase(req, res); //Fadi's create-case
      // res.send({msg : "Form Submitted Successfully"});
    } else {
      return res.status(403).send({ error: "Forbidden." });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: "An error has occured." });
  }

};
