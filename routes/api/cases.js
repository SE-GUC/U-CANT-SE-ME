const express = require('express');
const uuid = require('uuid');
const router = express.Router();

const Case = require('../../models/Case');
const cases = [];
//get all cases

router.get('/', (req, res) => res.json({ data: cases }));

router.get('/:id', (req, res) => {
    const caseID = req.params.id;
    for(let i=0;i<cases.length;i++) {
        if(cases[i].caseID===caseID)
            return res.json({ data: cases[i] });
    } 
    return res.status(404).send({ error: "ERROR 404: Case does not exist" }); 
})

module.exports = router;
