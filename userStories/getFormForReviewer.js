// As a reviewer I should be able to view a company establishment form that is reviewed or made by a lawyer,
// so that I can review it.

const ReviewerAuthenticated=true;
const Case = require("../models/Case.js")
const Reviewer = require("../models/Reviewer.js")
const express = require("express")
const router = express.Router()

router.get('/:reviewerID/', async (req,res) =>{
    try{
        if(ReviewerAuthenticated){
            let reviewerExists = await Reviewer.findById(req.params.reviewerID)
            if(reviewerExists===null)
                return res.json("Reviewer Does Not Exist")
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
            let reviewer = await Reviewer.findById(req.params.reviewerID)
            if(reviewer === null)
                return res.json("Reviewer Does Not Exist")
            let selectedCase = await Case.where("_id",req.params.caseID);
            if(selectedCase[0].caseStatus === "WaitingForReviewer" ){   
                selectedCase[0].caseStatus = "AssignedToReviewer";
                selectedCase[0].assignedReviewerId = req.params.reviewerID;
                selectedCase[0].assignedReviewers.push(req.params.reviewerID);
                await Case.findByIdAndUpdate(req.params.caseID,selectedCase[0])
                res.json(await Case.findById(req.params.caseID));
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

module.exports = router