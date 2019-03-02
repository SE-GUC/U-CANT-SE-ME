// Dependencies
const express = require("express");
const Joi = require("joi");
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


// Get certain admin
router.get('/:id',(req,res)  => {
    const adminId = req.params.id
    const admin = admins.find(admin => admin.id === adminId)
    res.send(admin)
})

//create admin
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

	const newAdmin = new Admin (
		userName,
        fullName,
        password
		
);
    admins.push(newAdmin)
    return res.json({ data: newAdmin });

});

//update Admin password , should we allow updating sometinhg else ?
router.put('/update/:id', (req, res) => {
    const adminId = req.params.id 
    const updatedpassword = req.body.password
    const admin = admins.find(admin => admin.id === adminId)
    admin.password = updatedpassword
    res.send(admins)
})

router.delete('/joi/:id', (req,res) => {
    const adminID = req.params.id;
    let adminExists = false;
    for(let i=0;i<admins.length;i++)
        if(admins[i].id===adminID)
        {
            admins.splice(i,1);
            adminExists = true;
            break;
        }   
    if(!adminExists)
        return res.status(404).send({ error: "Admin doesnt exist" });
    return res.json({ data: admins});
});




module.exports = router;