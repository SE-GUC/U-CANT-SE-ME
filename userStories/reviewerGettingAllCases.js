// const express = require("express")
// const router = express.Router()


// const Case = require("../models/Case");
// const Reviewer=require("../models/Reviewer");

// const reviewerGettingAllCasesAuthenticated=true;

// router.get('/:id/getAllCases',async (req,res)=>{
//     try{
//         if(reviewerGettingAllCasesAuthenticated){
//             const id=req.params.id
//             const reviewer = await Reviewer.findOne({'_id':id});
//             if(!reviewer){ 
//                 res.status(404).send({error: 'reviewer does not exist'});
//                 return; 
//             }
//             const cases = await Case.find();
//             res.json({data: cases});    
//         }
//         else{
//                return res.status(403).send({error: "Forbidden." });
//         } 
//     }
//     catch{
//         res.status(404).send({error:'reviewer does not exist'})
//         console.log(error);
//     }
// });
// module.exports = router