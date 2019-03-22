// As a reviewer I should be able to view a company establishment form that is reviewed or made by a lawyer,
// so that I can review it.
const ReviewerAuthenticated=true;
const Case = require("../../models/Case.js")
const express = require("express")
const router = express.Router()

router.get('/:reviewerID/', async (req,res) =>{
    try{
        if(ReviewerAuthenticated){
            let allcases = await Case.where("caseStatus","WaitingForReviewer");
            res.json(allcases);
        }
        else
            res.status(403).send({error: "Forbidden." })
    }
    catch(error){
        res.json({msg: "An error has occured."})
    }
});


router.get('/:reviewerID/:caseID', async (req,res) =>{
    try{
        if(ReviewerAuthenticated){
            let selectedCase = await Case.findbyId(req.CaseId);
            if(selectedCase.caseStatus === "WaitingForReviewer" ){   
                selectedCase.caseStatus = "AssignedToReviewer";
                selectedCase.assignedReviewerId = req.ReviewerID;
                selectedCase.assignedReviewers.push(req.ReviewerID);
                res.json(allcases);
            }
            else
                res.status(403).send({error: "Case is not supported." }) 
        }
        else
            res.status(403).send({error: "Forbidden." })
    }
    catch(error){
        res.json({msg: "An error has occured."})
    }
});
