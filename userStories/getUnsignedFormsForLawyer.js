// As a lawyer I should be able to view a company establishment form made by an investor, 
// so that I can review it.

const express = require("express")
const router = express.Router()

const lawyerAuthenticated=true;
const Case = require("../models/Case.js")

router.get('/:lawyerID/', async (req,res) =>{
    try{
        if(lawyerAuthenticated){
            let lawyerAuthenticated = await Lawyer.findById(req.params.lawyerID)
            if(lawyerAuthenticated===null)
                return res.json("Lawyer Does Not Exist")
            let allcases = await Case.where("caseStatus","WaitingForLawyer");
            res.json(allcases);
        }
        else
            res.status(403).send({error: "Forbidden." })
    }
    catch(error){
        res.json({msg: "An error has occured."})
    }
});


router.get('/:lawyerID/:caseID', async (req,res) =>{
    try{
        if(lawyerAuthenticated){
            let lawyer = await Lawyer.findById(req.params.lawyerID)
            if(lawyer === null)
                return res.json("Lawyer Does Not Exist")
            let selectedCase = await Case.where("_id",req.params.caseID);
            if(selectedCase[0].caseStatus === "WaitingForLawyer" ){   
                selectedCase[0].caseStatus = "AssignedToLawyer";
                selectedCase[0].assignedLawyerId = req.params.lawyerID;
                selectedCase[0].previouslyAssignedLawyers.push(req.params.lawyerID);
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