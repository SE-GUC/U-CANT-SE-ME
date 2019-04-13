const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const ExternalEntity = require("../models/ExternalEntity");
const validator = require('../validations/externalEntityValidations');

// GET
exports.getAllExternalEntities = async function(req, res) {
  const externalEntities = await ExternalEntity.find();
  res.json({ data: externalEntities});
};

// GET Specific External Entity
exports.getSpecificExternalEntity = async function(req, res) {
  try{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({ error:"Incorrect Mongo ID"});
    const requestedExtEntity = await ExternalEntity.findById(mongoose.Types.ObjectId(req.params.id));
    if(requestedExtEntity===null) return res.status(404).send("External Entity not Found");
    res.json({ data: requestedExtEntity });
  }
  catch{
    res.json({msg: "An error has occured"});
  }
};

// POST
exports.createExternalEntity = async function(req, res) {
  try{
    const name = req.body.name;
    const socket = req.body.socket;
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    let checkNameExists = await ExternalEntity.where("name",name);
    let checkSocketExists = await ExternalEntity.where("socket",socket);
    if(checkNameExists.length>0) return res.status(400).send({ error: "External Entity Name is already taken"});
    if(checkSocketExists.length>0) return res.status(400).send({ error: "External Entity Socket is already taken"});
    const newExtEntity = await ExternalEntity.create(req.body);
    res.json({msg:'External Entity was created successfully', data: newExtEntity});
  }
  catch{
    res.json({msg: "An error has occured"});
  }
};

// PUT
exports.updateExternalEntity = async function(req, res){
  try{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({ error:"Incorrect Mongo ID"});
    const name = req.body.name;
    const description = req.body.description;
    const socket = req.body.socket;
    const toBeUpdatedExtEntity = await ExternalEntity.findById(req.params.id);
    if(toBeUpdatedExtEntity===null) return res.status(404).send("External Entity not Found");
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    if(name){
      let checkNameExists = await ExternalEntity.where("name",name);
      if(checkNameExists.length>0) return res.status(400).send({ error: "External Entity Name is already taken"});
      toBeUpdatedExtEntity.name=name;
    }
    if(description){
      toBeUpdatedExtEntity.description=description;
    }
    if(socket){
      let checkSocketExists = await ExternalEntity.where("socket",socket);
      if(checkSocketExists.length>0) return res.status(400).send({ error: "External Entity Socket is already taken"});
      toBeUpdatedExtEntity.socket=socket;
    }
    await ExternalEntity.findByIdAndUpdate(req.params.id,toBeUpdatedExtEntity);
    res.json({msg:'External Entity was updated successfully', data: toBeUpdatedExtEntity});
  }
  catch{
    res.json({msg: "An error has occured"});
  }
};

exports.deleteExternalEntity = async function(req, res) {
  try{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({ error:"Incorrect Mongo ID"});
    const deletedExtEntity = await ExternalEntity.findByIdAndDelete(req.params.id);
    if(deletedExtEntity===null) return res.status(404).send("External Entity not Found");
    return res.json({msg:"External Entity deleted successfully", data: deletedExtEntity });
  }
  catch{
    res.json({msg: "An error has occured"});
  }
};
exports.notifyEntities=async function(caseId,caseType){
  const externalEntities = await ExternalEntity.find();
  const url='http://localhost:5000/api/externalEntities/pdf/'+caseId;
  const body={url:url};
  for(let i=0;i<externalEntities.length;i++)
  {
    let entity=externalEntities[i];
    let postURL = entity.socket;
    await axios.post(postURL,body);
  }
}