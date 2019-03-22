const express = require("express")
const router = express.Router()


const Case = require("../models/Case");
const Admin=require("../models/Admin");

const adminGettingAllCasesAuthenticated=true;

router.get('/:id/getAllCases',async (req,res)=>{
    try{
        if(adminGettingAllCasesAuthenticated){
            const id=req.params.id
            const admin = await Admin.findOne({'_id':id});
            if(!admin){ 
                res.status(404).send({error: 'Admin does not exist'});
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
        res.status(404).send({error:'Admin does not exist'})
        console.log(error);
    }
});
module.exports = router