const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const passport = require('passport')

const investorController = require('../../controllers/investorController')
const adminAuth = passport.authenticate('adminAuth',{session: false});
const investorAuth = passport.authenticate('investorAuth',{session: false});
const allAuth = passport.authenticate(['adminAuth','lawyerAuth','reviewerAuth'],{session: false});

//authorization
router.get('/auth',investorAuth, (req,res)=>{res.json({msg:"Hello Investor!"})});

//READ
router.get('/', adminAuth, investorController.getAllInvestors)

router.get('/:id', allAuth, investorController.getInvestor)

//CREATE
// router.post('/', investorController.createInvestor)

router.post('/register', investorController.register)

//UPDATE
router.put('/:id', investorAuth, investorController.updateInvestor)

//DELETE
router.delete('/:id', adminAuth, investorController.deleteInvestor)

//As an investor I should be able to view the lawyer’s comments on my company establishment form,
//so that I know what should be changed or updated in my form.
router.get('/lawyerComments/:investorID/:caseId', investorAuth, investorController.viewLawyerComments)

//As an investor I should be able to update my company establishment form,
//so that I can change or correct its content.
router.put('/updateForm/:investorId/:caseId', investorAuth, investorController.updateForm)

router.get('/myCompanies/:investorId',investorAuth, investorController.getMyCompanies)

router.get('/trackMyCompany/:id', investorAuth, investorController.trackMyCompany)

// As an investor I should be able to view my fees
router.get('/viewMyFees/:id', investorAuth, investorController.viewMyFees)

//As an investor I should be able to pay the fees of my approved company establishment request.
router.post('/payFees/:investorId/:caseId', investorAuth, investorController.payFees)

// As an investor I should be able to fill a company establishment form
router.post("/fillForm/:investorId", investorAuth, investorController.fillForm)

// As an investor I should be able to log in to the external portal, 
// so that I can use the system’s facilities.

router.post('/login', investorController.login)

router.post('/forgot', investorController.forgot)

router.post('/reset/:token', investorController.reset)

//As an investor i should update my case status after a lawyer requested a change
router.put('/resumeWorkOnCase/:caseId/:creatorInvestorId', investorAuth, investorController.resumeWorkOnCase);

module.exports = router;
