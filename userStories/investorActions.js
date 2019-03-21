//As an investor I should be able to view the lawyer’s comments on my company establishment form, 
//so that I know what should be changed or updated in my form.
const express = require("express")
const router = express.Router()

const Case = require("../models/Case.js")

const investorAuthenticated = true

router.get('/lawyerComments/:investorID/:caseID', async (req,res) => {
    try{
        if(investorAuthenticated){
            let caseForForm = await Case.find({"_id":req.params.caseID,"creatorInvestorId":req.params.investorID})
            if(caseForForm!==undefined)
                res.json({comments: caseForForm[0].comments})
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
