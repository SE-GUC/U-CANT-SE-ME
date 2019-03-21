

//to be aded on the index

//const reviewerTasks = require("./userStories/getReviewerTask");
//const lawyerTasks = require("./userStories/getLawyerTask");
// app.use("/api/reviewerTasks", reviewerTasks);
// app.use("/api/lawyerTasks", lawyerTasks);




const express = require("express")
const router = express.Router()

const Case = require("../models/Case.js")

const lawyerAuthenticated = true

router.get('/lawyerTasks/:lawyerID', async (req,res) => {
    try{
        if(lawyerAuthenticated){
            let lawyerCases = await Case.where("assignedLawyerId", req.params.lawyerID)
            // console.log(lawyerCases)
            if(lawyerCases!==undefined)
                res.json({Tasks: lawyerCases})
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