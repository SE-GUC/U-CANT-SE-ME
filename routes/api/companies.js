const express = require("express")
const router = express.Router()

const Company = require("../../models/Company.js")
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
  //check name isn't taken and check that this investor doesn't already own an SSC company
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
    const newCompany = await Company.create(req.body);
    res.json({msg:'Company was created successfully', data: newCompany})
  }
  catch(error){
    console.log(error)
  }
});

router.put("/:id", async (req, res) => {
  try{
    //check that the name doesn't already exist & that the requested company already exists & update status/name if given
    //handle here that companyName is in params but validation is in body
    //should we validate IDs and how? if so add it in get, and delete OTHERWISE just tell the user cant find what you want which is logical
    //const resultParams = validator.updateValidationParams(req.params)
    //if (resultParams.error)
      //return res.status(400).send({ error: resultParams.error.details[0].message })
    const resultBody = validator.updateValidationBody(req.body)
    if(resultBody.error)
      return res.status(400).send({ error: resultBody.error.details[0].message })
    console.log("Before putCompany")
    let putCompany = await Company.findById(req.params.id)
    if(putCompany.length===0)
      return res.status(404).send({ error: "Company does not exist!"})
    console.log("Put Company: "+putCompany)
    console.log("Company Name: "+putCompany.companyName)
    if(req.body.newCompanyName !== undefined){
      let checkIfCompanyNameExists = await Company.where("companyName", req.body.newCompanyName)
      if(checkIfCompanyNameExists.length>0)
        return res.status(400).send({error: "Company name already taken!" })
      console.log("newCompanyName: "+req.body.newCompanyName)
      putCompany.companyName = req.body.newCompanyName
    }
    if(req.body.newCompanyStatus !== undefined)
      putCompany.companyStatus = req.body.newCompanyStatus
    //fix update
      
    ////////////////////////////////////////////////

    ////////////////////////////////////////////////

    ////////////////////////////////////////////////

    ////////////////////////////////////////////////

    ////////////////////////////////////////////////
    await Company.findByIdAndUpdate(req.params.id,putCompany)
    res.json({msg: 'Company updated successfully'})
  }
  catch(error){
    console.log(error)
  }
})

router.delete("/:id", async (req, res) => {
  try{
    const deletedCompany = await Company.findByIdAndDelete(req.params.id)
    res.json({msg: 'Company was deleted successfully', data: deletedCompany})
  }
  catch(error){
    console.log(error)
  }
})

module.exports = router