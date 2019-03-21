//As a lawyer I should be able to view all my due tasks 
//in my work page, so that I am aware of the tasks 
//I am required to fulfill.


//As a reviewer I should be able to view all my due tasks
// in my work page, so that I am aware of the tasks 
//I am required to fulfill.

const express = require("express")
const router = express.Router()

const Case = require("../models/Case.js")

const reviewerAuthenticated = true

router.get('/reviewerTasks/:reviewerID', async (req,res) => {
    try{
        if(reviewerAuthenticated){
            let reviewerCases = await Case.where("assignedReviewerId", req.params.reviewerID)
            //console.log(reviewerCases)
            if(reviewerCases!==undefined)
                res.json({Tasks: reviewerCases})
            else
                res.status(404).send({error: "Data Not Found"})           
        }
        else
               return res.status(403).send({error: "Forbidden." })
    }
    catch(error){
        // console.log(error)
        res.json({msg: "An error has occured."})
    }
})



module.exports = router