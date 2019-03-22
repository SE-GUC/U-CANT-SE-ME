// Dependencies
const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();

// Models
const Case = require("../../models/Case");

router.get('/:id', async (req,res) => {
  const cases = await Case.find()
  const creatorInvestorId = req.params.id;
    flag = 0;
    message="";
    for (let i = 0; i < cases.length; i++) {
     
      if (String(cases[i].creatorInvestorId) === creatorInvestorId){  
          message+="Your company "+cases[i].companyNameEnglish+" is currently in phase "+cases[i].caseStatus+" ";
          flag=1;
      }
    }

     if(flag==0)
           message="You did not fill any establishment request yet.";
    res.json({"tracking": message});     
})
  

  module.exports = router;