// const express = require("express")
// const router = express.Router()
// const mongoose = require("mongoose");

// const Case = require("../models/Case.js")
// const Company= require("../models/Company.js");
// const Investor= require("../models/Investor.js");

// const investorAuthenticated = true

// //As an investor I should be able to view the lawyer’s comments on my company establishment form, 
// //so that I know what should be changed or updated in my form.
// router.get('/lawyerComments/:investorID/:caseID', async (req,res) => {
//     try{
//         if(investorAuthenticated){
//             let caseForForm = await Case.find({"_id":req.params.caseID,"creatorInvestorId":req.params.investorID})
//             if(caseForForm!==undefined)
//                 res.json({comments: caseForForm[0].comments})
//             else
//                 res.status(404).send({error: "Data Not Found"})           
//         }
//         else
//                return res.status(403).send({error: "Forbidden." })
//     }
//     catch(error){
//         // console.log(error)
//         res.json({msg: "An error has occured."})
//     }
// })
// //As an investor I should be able to view all my companies,
// //so that I have a history of my created / pending companies
// router.get('/myCompanies/:investorID', async (req,res) => {
//     try{
//         if(!mongoose.Types.ObjectId.isValid(req.params.investorID)) return res.status(400).send({ error:"Incorrect Mongo ID"});
//         const checkInvestor = await Investor.find({"_id":req.params.investorID});
//         if(checkInvestor.length===0) return res.status(404).send("Investor not Found");
//         if(investorAuthenticated){
//             const companies = await Company.find({"investorID":req.params.investorID});
//             if(companies.length===0) 
//                 res.json({msg: "You don't have any Companies yet."});
//             else
//                 res.json({data: companies});
//         }
//         else{
//             return res.status(403).send({error: "Forbidden." });
//         }
//     }
//     catch{
//         res.json({msg: "An error has occured."});
//     }
// });

// module.exports = router
