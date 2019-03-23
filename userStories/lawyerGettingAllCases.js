const express = require("express")
const router = express.Router()


const Case = require("../models/Case");
const Lawyer=require("../models/Lawyer");

const LawyerGettingAllCasesAuthenticated=true;

router.get('/:id/getAllCases',async (req,res)=>{
    try{
        if(LawyerGettingAllCasesAuthenticated){
            const id=req.params.id
            const lawyer = await Lawyer.findOne({'_id':id});
            if(!lawyer){ 
                res.status(404).send({error: 'lawyer does not exist'});
                return; 
            }
            const cases = await Case.find();
            res.json({data: cases});    
        }
        else{
               return res.status(403).send({error: "Forbidden." });
        } 
    }
    catch{
        res.status(404).send({error:'lawyer does not exist'})
        console.log(error);
    }
});

module.exports = router