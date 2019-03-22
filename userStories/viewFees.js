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
        
      }
    
    res.json({"response": result});     
})
function calcFees(case1) {
  if(case1.regulatedLaw.includes("72")){
    return 610;
  }
  const capital=case1.capital;
  const x= case1.legalFormOfCompany;
  let ans=50;
  ans+= Math.min(1000,Math.max(100,capital/1000.0));
  ans+= Math.min(1000,Math.max(10,capital/400.0));
  return ans;
} 

  module.exports = router;
  // localhost:3000/api/viewFees/5c93b4e540c0953446ced382