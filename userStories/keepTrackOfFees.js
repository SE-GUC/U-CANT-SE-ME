// Dependencies
const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();
const idValidator = require("validator");
// Models
const Case = require("../models/Case");
const Investor = require("../models/Investor");
router.get('/:id', async (req,res) => {
  const id=req.params.id;
  if(!idValidator.isMongoId(id)){
      res.json({error:"invalid ID format"});
      return;
  }
  const investor = await Investor.findById(id);
  if(!investor){
    res.json({error:"investor not found"});
    return;
  }
  const cases = await Case.find()
  const creatorInvestorId = req.params.id;
  let result=[];
    for (let i = 0; i < cases.length; i++) 
      if (String(cases[i].creatorInvestorId) === creatorInvestorId && cases[i].caseStatus === "Accepted"){
        const fees=calcFees(cases[i]);
        result.push({companyName:cases[i].companyNameEnglish,fees:fees} )
        // message+="Your company "+cases[i].companyNameEnglish+" has fees "+fees+"    -------";
      }
    
    res.json({"response": result});     
})
function calcFees(case1) {
  if(case1.regulatedLaw.includes("72")){
    return 610;
  }
  const capital=case1.capital;
  const x= case1.legalFormOfCompany;
  if(x==='GAFI') 
    return Math.min(1000,Math.max(100,capital/1000.0));
  if(x=='Notary Public')
    return Math.min(1000,Math.max(10,capital/400.0));
  else
    return 56;
} 

  module.exports = router;