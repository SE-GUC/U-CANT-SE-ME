/**
* @jest-environment node
*/
const mongoose = require("mongoose");
jest.setTimeout(50000)

const lawyers = require('./lawyers')
//const cases = require('./cases')
const Case = require("../models/Case");
let caseID = ''
const db = require("../config/keys").mongoURI;

const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const nock = require('nock')
const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;
ObjectId = require('mongodb').ObjectID;

test ('lawyer get his cases sorted by id',async() =>{
  mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
    expect.assertions(0)
    const hisCases = await lawyers.getMyCasesSortedById("5c9d62cabbbd0a30248a1ec3")
    const hisActualCases = await Case.find({"assignedLawyerId": "5c9d62cabbbd0a30248a1ec3"}).sort({_id: 1})
    for(let i =0 ; i<hisCases.length ; i++){
        expect(hisCases[i].data.data.form).toEqual(hisActualCases[i].data.data.form) 
        && expect(hisCases[i].data.data.caseStatus).toEqual(hisActualCases[i].data.data.caseStatus) 
        && expect(hisCases[i].data.data.assignedLawyerId).toEqual(hisActualCases[i].data.data.assignedLawyerId) 
        && expect(hisCases[i].data.data.assignedReviewerId).toEqual(hisActualCases[i].data.data.assignedReviewerId)
        && expect(hisCases[i].data.data.creatorassignedLawyerId).toEqual("5c9d62cabbbd0a30248a1ec3") 
    }
    mongoose.disconnect(db)
    })
  
test ('lawyer get his cases sorted by date of creation',async() =>{
  mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
  expect.assertions(0)
  const hisCases = await lawyers.getMyCasesSortedByDate("5c9d62cabbbd0a30248a1ec3")
  const hisActualCases = await Case.find({"assignedLawyerId": "5c9d62cabbbd0a30248a1ec3"}).sort({caseCreationDate: 1})
  for(let i =0 ; i<hisCases.length ; i++){
      expect(hisCases[i].data.data.form).toEqual(hisActualCases[i].data.data.form) 
      && expect(hisCases[i].data.data.caseStatus).toEqual(hisActualCases[i].data.data.caseStatus) 
      && expect(hisCases[i].data.data.assignedLawyerId).toEqual(hisActualCases[i].data.data.assignedLawyerId) 
      && expect(hisCases[i].data.data.assignedReviewerId).toEqual(hisActualCases[i].data.data.assignedReviewerId)
      && expect(hisCases[i].data.data.creatorassignedLawyerId).toEqual("5c9d62cabbbd0a30248a1ec3") 
  }
  mongoose.disconnect(db)
  })
