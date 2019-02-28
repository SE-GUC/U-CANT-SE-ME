
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

const Reviewer = require('../../models/Reviewer');

let Reviewers = [
    new Reviewer(uuid.v4(),'john1','782973','john1 samir',["123","123"],'ahmed.mohamed@gmail.com'),
    new Reviewer(uuid.v4(),'john2','782973','john2 samir',["123","123"],'ahmed.mohamed@gmail.com'),
    new Reviewer(uuid.v4(),'john3','782973','john3 samir',["123","123"],'ahmed.mohamed@gmail.com'),
    new Reviewer(uuid.v4(),'john4','782973','john4 samir',["123","123"],'ahmed.mohamed@gmail.com'),
    new Reviewer(uuid.v4(),'john5','782973','john5 samir',["123","123"],'ahmed.mohamed@gmail.com'),
    new Reviewer(uuid.v4(),'john6','782973','john6 samir',["123","123"],'ahmed.mohamed@gmail.com'),
    new Reviewer(uuid.v4(),'john7','782973','john7 samir',["123","123"],'ahmed.mohamed@gmail.com'),
    new Reviewer(uuid.v4(),'john8','782973','john8 samir',["123","123"],'ahmed.mohamed@gmail.com')
];

router.get('/', (req, res) => res.json({ data: Reviewers }));

router.get('/:id',(req,res)  => {
    const reviewerId = req.params.id
    const reviewer = Reviewers.find(reviewer => reviewer.id === reviewerId)
    res.send(reviewer)
})
router.delete('/activecase/:id/:id2',(req,res)=>{
    var reviewerId = req.params.id;
    var caseId=req.params.id2;
    const reviewer = Reviewers.find(reviewer => reviewer.id === reviewerId)
    if(!reviewer){ res.status(404).send('no reviwer with this ID');
    return;
}
else{
    const caseno=reviewer.activeCases.find(caseno => caseno===caseId)
    if(!caseno){
        res.status(404).send('NO case with this ID');
    }
    else{
        const index =reviewer.activeCases.indexOf(caseno+"")
        reviewer.activeCases.splice(index,1)
        res.send(reviewer)
    }
}
});
router.put('/update/:id', (req, res) => {
    const schema = {
		userName: Joi.string().min(2),
        fullName: Joi.string().min(7),
        activeCases: Joi.string().min(1),
		password: Joi.string().min(3)
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send({ error: result.error.details[0].message });
    const reviewerId = req.params.id 
    const userName = req.body.userName
    const fullName = req.body.fullName
    const activeCases=req.body.activeCases
    const password = req.body.password
    const reviewer = Reviewers.find(reviewer => reviewer.id === reviewerId)
    if(fullName)
        reviewer.fullName = fullName
    if(userName)
        reviewer.userName = userName
    if(password)
        reviewer.password = password
    if(activeCases)
        reviewer.activeCases.push(activeCases);
    
    
    res.send(reviewer)
})

router.post('/create', (req, res) => {
	const schema = {
		userName: Joi.string().min(2).required(),
        fullName: Joi.string().min(7).required(),
		password: Joi.string().min(3).required(),
        email: Joi.string().min(10).required()
	}

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });
    const id=uuid.v4()
    const userName = req.body.userName
    const password = req.body.password
    const fullName = req.body.fullName
    const activeCases=new Array()
    const email = req.body.email

	const newReviewer = {
        id,
        userName,
        password,
		fullName,
        activeCases,
        email
    };
    
    Reviewers.push(newReviewer);

	return res.json({ data: newReviewer });
});

module.exports = router; 