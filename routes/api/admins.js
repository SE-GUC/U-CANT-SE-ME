// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
const Admin = require('../../models/Admin');

// temporary data created as if it was pulled out of the database ...
const admins = [
	new Admin('Barney', 'barney john','Ze1998'),
	new Admin('liilly', 'lily john','Ze1998'),
	new Admin('jake', 'jake john','Ze1998'),
	new Admin('jacob', 'jacob john','Ze1998')
];


// Get all admins
router.get('/', (req, res) => res.json({ data: admins }));

// Create a new admin in 2 different ways , we will choose yet ,so which one ?
//what should we add any more requirments for the entered data as constraints ?
router.post('/', (req, res) => {
    const userName = req.body.userName;
    const fullName = req.body.fullName;
	const password = req.body.password;

	if (!userName) return res.status(400).send({ err: 'userName field is required' });
	if (typeof userName !== 'string') return res.status(400).send({ err: 'Invalid value for userName' });
	if (!fullName) return res.status(400).send({ err: 'fullName field is required' });
    if (typeof fullName !== 'string') return res.status(400).send({ err: 'Invalid value for fullName' });
    if (!password) return res.status(400).send({ err: 'password field is required' });
    if (typeof password !== 'string') return res.status(400).send({ err: 'Invalid value for password' });

	const newAdmin = {
		userName,
        fullName,
        password,
		id: uuid.v4(),
	};
	return res.json({ data: newAdmin });
});

router.post('/joi', (req, res) => {
    const userName = req.body.userName;
    const fullName = req.body.fullName;
	const password = req.body.password;


	const schema = {
		userName: Joi.string().min(1).required(),
        fullName: Joi.string().min(1).required(),
        password: Joi.string().min(1).required(),
	}

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

	const newAdmin = {
		userName,
        fullName,
        password,
		id: uuid.v4(),
	};
	return res.json({ data: newAdmin });
});

//update Admin password , should we allow updating sometinhg else ?
router.put('/api/admins/:id', (req, res) => {
    const adminId = req.params.id 
    const updatedpassword = req.body.password
    const admin = admin.find(admin => admin.id === adminId)
    admin.password = updatedpassword
    res.send(admins)
})


module.exports = router;