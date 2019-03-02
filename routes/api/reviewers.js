
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

const Reviewer = require('../../models/Reviewer');

let Reviewers = [
    new Reviewer('john1','782973','john1 samir','ahmed.mohamed@gmail.com'),
    new Reviewer('john2','782973','john2 samir','ahmed.mohamed@gmail.com'),
    new Reviewer('john3','782973','john3 samir','ahmed.mohamed@gmail.com'),
    new Reviewer('john4','782973','john4 samir','ahmed.mohamed@gmail.com'),
    new Reviewer('john5','782973','john5 samir','ahmed.mohamed@gmail.com'),
    new Reviewer('john6','782973','john6 samir','ahmed.mohamed@gmail.com'),
    new Reviewer('john7','782973','john7 samir','ahmed.mohamed@gmail.com'),
    new Reviewer('john8','782973','john8 samir','ahmed.mohamed@gmail.com')
];

router.get('/', (req, res) => res.json({ data: Reviewers }));

router.get('/:id',(req,res)  => {
    const reviewerId = req.params.id
    const reviewer = Reviewers.find(reviewer => reviewer.id === reviewerId)
    if(!reviewer)
        res.status(404).send({err: 'THERE IS NO REVIEWER WITH THIS ID'});
    else
        res.send(reviewer)
});

router.put('/update/:id', (req, res) => {
    const schema = {
		userName: Joi.string().min(2),
        fullName: Joi.string().min(7),
		password: Joi.string().min(3)
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send({ error: result.error.details[0].message });
    const reviewerId = req.params.id 
    const userName = req.body.userName
    const fullName = req.body.fullName
    const password = req.body.password
    const reviewer = Reviewers.find(reviewer => reviewer.id === reviewerId)
    if(!reviewer)
    res.status(404).send({err: 'THERE IS NO REVIEWER WITH THIS ID'});
    else{
        if(fullName)
            reviewer.fullName = fullName
        if(userName)
            reviewer.userName = userName
        if(password)
            reviewer.password = password
        
        
        res.send(reviewer)

}
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
    const userName = req.body.userName
    const password = req.body.password
    const fullName = req.body.fullName
    const email = req.body.email

	const newReviewer = {
        userName,
        password,
		fullName,
        email
    };
    
    Reviewers.push(newReviewer);

	return res.json({ data: newReviewer });
});

module.exports = router; 