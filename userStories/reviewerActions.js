const express = require("express")
const router = express.Router()

const Case = require("../models/Case.js")
const reviewerAutenticated=true;
//in the future it will be assigned by calling some sort of method that authenticates them

//Reviewer
router.put('/updateCaseStatus/:caseID/:newStatus', async (req,res) => 
{
    if(reviewerAutenticated)
    {
        try
        {
            await Case.findByIdAndUpdate(req.params.caseID,{"caseStatus":req.params.newStatus})
            res.json(await Case.findById(req.params.caseID))
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