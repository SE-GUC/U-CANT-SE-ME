const express = require('express')
const Joi = require('joi')
const uuid = require('uuid')
const router = express.Router()

const Company = require('../../models/Company.js')

const companies = [
    new Company(1, 1, 'MantaHabd', 'SPC', 'in creation', '1-1-2019'),
    new Company(2, 2, 'abo fatma for electronics', 'SPC', 'created', '1-1-1111'),
    new Company(3, 3, 'The Company Of SE', 'SSC', 'Destroyed', '4-4-1944'),
	new Company(4, 4, 'malahy moe', 'SSC', 'lovely', '1-1-1111'),
	new Company(5, 100, '3am saad', 'SPC', 'in creation', '6-9-1969'),
	new Company(6, 6, 'the hood', 'SPC', 'boom', '1-1-1111')
];

router.post('/joi', (req, res) => {
    const socialInsuranceNumber = req.body.socialInsuranceNumber
	const investorID = req.body.investorID
    const companyType = req.body.companyType
    const companyStatus = req.body.companyStatus
    const dateOfCreation = req.body.dateOfCreation
    const companyName = req.body.companyName
    let flagCompanyName = false
    let flagValidSSC = false

    for(let i=0; i<companies.length;i++){
        if(companies[i].companyName===companyName)
            flagCompanyName = true
        if(companies[i].investorID===investorID && companies[i].companyType==="SSC" && companyType==="SSC")
            flagValidSSC = true
    }
    if(flagCompanyName)
        return res.status(400).send({ error: "Company Name Already Taken" })
    if(flagValidSSC)
        return res.status(400).send({ error: "You already own an SSC Company!"})
 
    const schema = {
        socialInsuranceNumber :Joi.number().required(),
        investorID : Joi.number().required(),
        companyType : Joi.string().min(3).required(),
        companyStatus : Joi.string().min(3).required(),
        dateOfCreation : Joi.date(),
        companyName : Joi.string().min(3).required(),
    }
	const result = Joi.validate(req.body, schema);

    if (result.error) return res.status(400).send({ error: result.error.details[0].message });
    const newCompany = new Company(socialInsuranceNumber, investorID, companyName, companyType, companyStatus, dateOfCreation)
    companies.push(newCompany)
	return res.json({ data: newCompany })
});

router.put('/joi', (req,res) => {
    const companyName = req.body.companyName
    const newCompanyName = req.body.newCompanyName
    const companyStatus = req.body.companyStatus
    let companyExists = false
    // console.log(newCompanyName)
    for(let i=0 ; i<companies.length;i++)
        if(companies[i].companyName===companyName)
            companyExists = true
    if(!companyExists)
        return res.status(404).send({ error: "ERROR 404: Company does not exist" })
    const schema = {
        companyName : Joi.string().min(3).required(),
        companyStatus : Joi.string().min(3),
        newCompanyName : Joi.string().min(3),
    }
    const result = Joi.validate(req.body, schema)
    
    if (result.error) return res.status(400).send({ error: result.error.details[0].message })
    
    let validCompanyName = true
    let companyNameGiven=false
    if(newCompanyName!==undefined){
        companyNameGiven=true
        for(let i = 0;i<companies.length;i++)
            if(companies[i].companyName===newCompanyName)
                validCompanyName = false
        if(!validCompanyName)
            return res.status(400).send({ error: "Company name already exists" })
        
        for(let i=0;i<companies.length;i++)
            if(companies[i].companyName===companyName)
                companies[i].companyName=newCompanyName
    }
    if(companyStatus!==undefined)
        for(let i=0;i<companies.length;i++)
            if(companies[i].companyName===companyName || (companyNameGiven && companies[i].companyName===newCompanyName))
                companies[i].companyStatus=companyStatus
    return res.json({ data: companies})

});

router.delete('/joi', (req,res) => {
    const companyName = req.body.companyName
    let companyExists = false
    for(let i=0;i<companies.length;i++)
        if(companies[i].companyName===companyName)
        {
            companies.splice(i,1)
            companyExists = true
            break
        }   
    
    if(!companyExists)
        return res.status(404).send({ error: "Company name does not exist" })
    
    return res.json({ data: companies})

});

module.exports = router