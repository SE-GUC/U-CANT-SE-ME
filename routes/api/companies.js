const express = require("express")
const router = express.Router()

const Company = require("../../models/Company.js")
const Investor = require("../../models/Investor.js")
const Case = require("../../models/Case.js")
const validator = require('../../validations/companyValidations')


router.get('/', async (req,res) => {
  const companies = await Company.find()
  res.json({data: companies})
})

router.get("/:id", async (req, res) => {
  try{
    const requestedCompany = await Company.findById(req.params.id)
    res.json({msg: 'Company was found successfully', data: requestedCompany})
  }
  catch{
    return res.status(404).send({ error: "ERROR 404: Company does not exist" })
  }
})

router.post("/", async (req, res) => {
  try{
    const caseID = req.body.caseID
    const investorID = req.body.investorID
    delete req.body.caseID
    delete req.body.investorID
    const result = validator.createValidation(req.body)
    if (result.error)
      return res.status(400).send({ error: result.error.details[0].message })
    let postCompany = await Company.where("companyName", req.body.companyName)
    let investorCompanies = await Company.where("investorID", req.body.investorID)
    let countSSC = 0
    for(let i=0;i<investorCompanies.length;i++)
      if(investorCompanies[i].companyType === "SSC")
        countSSC++
    if (countSSC>0 && req.body.companyType==="SSC")
        return res.status(400).send({ error: "You already own an SSC Company!" })
    if (postCompany.length>0)
        return res.status(400).send({error: "Company name already taken!" })
    req.body.caseID = caseID
    req.body.investorID = investorID
    const newCompany = await Company.create(req.body)
    res.json({msg:'Company was created successfully', data: newCompany})
  }
  catch(error){
    res.json({msg: "An error has occured, check your entered data please."})
  }
});

router.put("/:id", async (req, res) => {
  try{
    const resultBody = validator.updateValidationBody(req.body)
    if(resultBody.error)
      return res.status(400).send({ error: resultBody.error.details[0].message })
    let putCompany = await Company.findById(req.params.id)
    if(putCompany.length===0)
      return res.status(404).send({ error: "Company does not exist!"})
    if(req.body.newCompanyName !== undefined){
      let checkIfCompanyNameExists = await Company.where("companyName", req.body.newCompanyName)
      if(checkIfCompanyNameExists.length>0)
        return res.status(400).send({error: "Company name already taken!" })
      putCompany.companyName = req.body.newCompanyName
    }
    await Company.findByIdAndUpdate(req.params.id,putCompany)
    res.json({msg: 'Company updated successfully'})
  }
  catch(error){
    res.json({msg: " An error has occured, check your entered data please."})
  }
})

router.delete("/:id", async (req, res) => {
  try{
    const deletedCompany = await Company.findByIdAndDelete(req.params.id)
    res.json({msg: 'Company was deleted successfully', data: deletedCompany})
  }
  catch(error){
    res.json({msg: "An error has occured, please check your entered data."})
  }
})

module.exports = router
