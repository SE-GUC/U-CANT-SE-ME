// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// module Lawyer
const Lawyer=require('../../models/Lawyer');

const lawyerss = [
     new Lawyer('ahmedmohameasdas','email@yahoo.com','dondo98','password1'),
     new Lawyer('ahmedmohameasdas','email@yahoo.com','dondo98','password1')

];

//read all lawyers
router.get('/',(req,res)=>{
    res.json({ data: lawyerss });

});



//Read Certain lawyer doneee
router.get('/:id', (req, res) => {
    var lawyerId = req.params.id;
    const lawyerI = lawyerss.find(l =>  l.id ===  lawyerId);
   
//  var i=0;
//  var x=0;
//    for(;i<lawyerss.length;i++){
//       if(lawyerss[i].id==req.params.id){
//       console.log(lawyerss[i].id)
//        var  lawyerI=lawyerss[i]
//         x=1;
//       }

//    }


    if(!lawyerI){
        //404 object not found
      res.status(404).send('this lawyer is not found ');
      return;
    }
    else{
    res.send(lawyerI);
    }

});





//create new lawyer doneeeeeeeeee
router.post('/', (req, res) => {
  //  const id =lawyerss.length+1
  
	const fullName = req.body.fullName

    const email=req.body.email
    const userName=req.body.userName
    const password=req.body.password
	const result = validateLawyer(req.body);
	if (result.error) {
       return res.status(400).send({ error: result.error.details[0].message });
        
    }
    const newLawyer2= new Lawyer(fullName,email,userName,password)
   
    lawyerss.push(newLawyer2);
	 res.json({ data: newLawyer2 });
});

//update lawyer done
router.put('/:id', (req,res)=>{
    // look up the lawyer 
    // if not existing return 404
     const lawyerId = req.params.id
    const lawyerI = lawyerss.find(l =>  l.id ===  lawyerId);
  
     if(!lawyerI){
         //404 object not found
         res.status(404).send('this lawyer is not found ');
         return
        
    }
    //validate 
    //if invalid return 400-bad request
   const result = validateLawyerForUpdate(req.body);

	if (result.error) {
      return  res.status(400).send({ error: result.error.details[0].message });
    }
    //update the lawyer
    if(req.body.fullName) lawyerI.fullName=req.body.fullName;
    if(req.body.email) lawyerI.email=req.body.email;
    if(req.body.userName) lawyerI.userName=req.body.userName;
    if(req.body.password) lawyerI.password=req.body.password;

    //return the updated lawyer
    res.send(lawyerI);

});

router.delete('/:id',(req,res)=>{
// look up the lawyer
const lawyerId = req.params.id
const lawyerI = lawyerss.find(l =>  l.id ===  lawyerId);
//not existing ,return 404
if(!lawyerI){ res.status(404).send('this lawyer is not found ');
}
else{
// delete
const index = lawyerss.indexOf(lawyerI)
lawyerss.splice(index,1)
//return the same lawyer
res.send(lawyerI);
}
});

// for activeCases add a case 
// router.put('/:id/activecase',(req,res)=>{
  
//     var lawyerId = req.params.id;
//     const lawyerI = lawyerss.find(l =>  l.id ===  lawyerId);
//     if(!lawyerI){ res.status(404).send('this lawyer is not found ');
//     return;
// }
// else{
//     lawyerI.activeCases.push(req.body.caseId);
//     res.send(lawyerI);
// }
// });
// router.delete('/:id/activecase/:id2',(req,res)=>{
//     var lawyerId = req.params.id;
//     var caseId=req.params.id2;
//     const lawyerI = lawyerss.find(l =>  l.id ===  lawyerId);
//     if(!lawyerI){ res.status(404).send('this lawyer is not found ');
//     return;
// }
// else{
//     const caseID2=lawyerI.activeCases.find(c => c===caseId)
//     if(!caseID2){
//         res.status(404).send('this case is not in your active cases ');
//     }
//     else{
//         const index =lawyerI.activeCases.indexOf(caseID2+"")
//         lawyerI.activeCases.splice(index,1)
//         res.send(lawyerI)
//     }
// }
// });





function validateLawyer(l1){
    const schema = {

        fullName:Joi.string().min(10).required(),
        email:Joi.string().required(),
        userName:Joi.string().min(4).required(),
        password:Joi.string().min(4).required()


	};

	return result = Joi.validate(l1, schema);

	
};
function validateLawyerForUpdate(l1){
    const schema = {

        fullName:Joi.string().min(10),
        email:Joi.string(),
        userName:Joi.string().min(4),
        password:Joi.string().min(4)
	};

	return result = Joi.validate(l1, schema);

	
};
module.exports = router;
