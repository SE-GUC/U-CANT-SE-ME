const express = require('express');
const uuid = require('uuid');
const router = express.Router();

const Case = require('../../models/Case');
const cases = [ 
	new Case('hello', 'hello','SPC')
];

//get all cases , NOT THE ENTIRE READ CASE

router.get('/', (req, res) => res.json({ data: cases }));

//create case

router.post('/', (req, res) => {
	const investorID = req.body.investorID;
	const organizationID = req.body.organizationID;
	const companyType = req.body.companyType;

	if (!investorID && !organizationID) return res.status(400).send({ err: 'There must be an organization ID or an investor ID' });
	if (typeof investorID !== 'string' || typeof organizationID !== 'string') return res.status(400).send({ err: 'Invalid value for ID' });
	if (!companyType) return res.status(400).send({ err: 'Company type field is required' });
	if (companyType !== 'SPC' && companyType !== 'SSC') return res.status(400).send({ err: 'Invalid value for company type' });
	
	const newCase = new Case(investorID,organizationID,companyType);
	
	cases.push(newCase)
	return res.json({ data: newCase });
});

//delete case

router.delete('/:caseID', (req, res) => {
    const caseID = req.params.id
    const cas = cases.find(cas => cas.caseID === caseID)
	const index = cases.indexOf(cas)
    cases.splice(index,1)
    res.send(cases)
});

//update

router.put('/update/:caseID' , (req,res) => {

	const caseID = req.params.caseID
	// const Case = cases.find(Case => Case.caseID === caseID )
	var Case=null;
	for(let i=0;i<cases.length;i++)
		if(cases[i].caseID === caseID)
			Case = cases[i];
	if(Case === null)
		return res.status(400).send({ err: 'Can not find the Case ID' });
		
	//check here again for the updates
	const Update_caseStatus = req.body.caseStatus;
	const Update_companyType = req.body.companyType;
	const Update_assigneeID = req.body.assigneeID;
	
	if(Update_caseStatus)
		Case.caseStatus=Update_caseStatus;
	if(Update_companyType)
		Case.companyType =Update_companyType;
	if(Update_assigneeID)
		Case.assigneeID = Update_assigneeID;
	
	res.send(cases);
});

module.exports = router;
