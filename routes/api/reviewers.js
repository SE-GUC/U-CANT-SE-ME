
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

const Reviewer = require('../../models/Reviewer');

let Reviewers = [
    new Reviewer(uuid.v4(),'ahmed1 mohamed sami','Male','02/02/1998','New Cairo','010893792348','782973','ahmed.mohamed@gmail.com'),
    new Reviewer(uuid.v4(),'ahmed2 mohamed sami','Male','02/02/1998','New Cairo','010893792348','782973','ahmed.mohamed@gmail.com'),
    new Reviewer(uuid.v4(),'ahmed3 mohamed sami','Male','02/02/1998','New Cairo','010893792348','782973','ahmed.mohamed@gmail.com'),
    new Reviewer(uuid.v4(),'ahmed4 mohamed sami','Male','02/02/1998','New Cairo','010893792348','782973','ahmed.mohamed@gmail.com'),
    new Reviewer(uuid.v4(),'ahmed5 mohamed sami','Male','02/02/1998','New Cairo','010893792348','782973','ahmed.mohamed@gmail.com'),
    new Reviewer(uuid.v4(),'ahmed6 mohamed sami','Male','02/02/1998','New Cairo','010893792348','782973','ahmed.mohamed@gmail.com'),
    new Reviewer(uuid.v4(),'ahmed7 mohamed sami','Male','02/02/1998','New Cairo','010893792348','782973','ahmed.mohamed@gmail.com'),
    new Reviewer(uuid.v4(),'ahmed8 mohamed sami','Male','02/02/1998','New Cairo','010893792348','782973','ahmed.mohamed@gmail.com')
];

router.get('/', (req, res) => res.json({ data: Reviewers }));

router.get('/:id',(req,res)  => {
    const reviewerId = req.params.id
    const reviewer = Reviewers.find(reviewer => reviewer.id === reviewerId)
    res.send(reviewer)
})

router.put('/update/:id', (req, res) => {
    const schema = {
		fullName: Joi.string().min(6),
        gender: Joi.string(),
        dateOfBirth: Joi.date(),
        ressidenceAddress: Joi.string().min(4),
        telephoneNumber: Joi.string(),
        fax: Joi.string(),
        email: Joi.string().min(10),
		password: Joi.string().min(3),
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send({ error: result.error.details[0].message });

    const reviewerId = req.params.id 
    const fullName = req.body.fullName
    const gender = req.body.gender
    const dateOfBirth = req.body.dateOfBirth
    const ressidenceAddress = req.body.ressidenceAddress
    const telephoneNumber = req.body.telephoneNumber
    const fax = req.body.fax
    const email = req.body.email
    const password = req.body.password
    const reviewer = Reviewers.find(reviewer => reviewer.id === reviewerId)
    
    reviewer.fullName = fullName
    reviewer.gender = gender
    reviewer.dateOfBirth = dateOfBirth
    reviewer.ressidenceAddress = ressidenceAddress
    reviewer.telephoneNumber = telephoneNumber
    reviewer.fax = fax
    reviewer.email = email
    reviewer.password = password
    
    
    res.send(Reviewers)
})

router.post('/create', (req, res) => {
	const schema = {
		fullName: Joi.string().min(6).required(),
        gender: Joi.string().required(),
        dateOfBirth: Joi.date().required(),
        ressidenceAddress: Joi.string().min(4).required(),
        telephoneNumber: Joi.string().required(),
        fax: Joi.string(),
        email: Joi.string().min(10).required(),
		password: Joi.string().min(3).required(),
	}

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

    const fullName = req.body.fullName
    const gender = req.body.gender
    const dateOfBirth = req.body.dateOfBirth
    const ressidenceAddress = req.body.ressidenceAddress
    const telephoneNumber = req.body.telephoneNumber
    const fax = req.body.fax
    const email = req.body.email
    const password = req.body.password

	const newReviewer = {
		id: uuid.v4(),
		fullName,
        gender,
        dateOfBirth,
        ressidenceAddress,
        telephoneNumber,
        fax,
        email,
        password
    };
    
    Reviewers.push(newReviewer);

	return res.json({ data: newReviewer });
});

module.exports = router; 