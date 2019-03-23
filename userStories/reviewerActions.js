const express = require("express")
const router = express.Router()
const Joi = require('joi')
const Case = require("../models/Case.js")
const mongoValidator = require("validator");
const reviewerAutenticated=true;
//in the future it will be assigned by calling some sort of method that authenticates them

//Reviewer
router.put('/updateCaseStatus/:caseId/:caseStatus', async (req,res) => 
{
    if(reviewerAutenticated)
    {
       if(!mongoValidator.isMongoId(req.params.caseId) || await Case.findById(req.params.caseId)===null)
            return res.status(400).send({ err : "Invalid case id" })
        if(req.params.caseStatus!=="New" && req.params.caseStatus!=="OnUpdate" && req.params.caseStatus!=="WaitingForLawyer" && req.params.caseStatus!=="AssginedToLawyer" && req.params.caseStatus!=="WaitingForReviewer" && req.params.caseStatus!=="AssginedToReviewer" && req.params.caseStatus!=="Accepted" && req.params.caseStatus!="Rejected")
            return res.status(400).send({err: "Invalid new status"})
        try
        {
            await Case.findByIdAndUpdate(req.params.caseId,{"caseStatus":req.params.caseStatus})
            res.json(await Case.findById(req.params.caseId))
        }
        catch(error)
        {
            res.json({msg:"A fatal error has occured, could not update the case status."})
        }
    }
    else
        return res.status(403).send({error: "Forbidden." })
})

module.exports = router
