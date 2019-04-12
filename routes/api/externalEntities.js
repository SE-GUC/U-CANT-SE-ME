const express = require("express");
const router = express.Router();
const pdf=require('html-pdf');
const externalEntityController = require("../../controllers/externalEntityController")
// GET
router.get("/", externalEntityController.getAllExternalEntities);

// GET Specific External Entity
router.get("/:id", externalEntityController.getSpecificExternalEntity);

// POST
router.post("/", externalEntityController.createExternalEntity);

// PUT
router.put("/:id", externalEntityController.updateExternalEntity);

// DELETE
router.delete("/:id",externalEntityController.deleteExternalEntity);

router.get("/pdf/:id", externalEntityController.notifyExternalEntity);
router.get('/fetch-pdf/fetch-pdf', (req, res) => {
    console.log("GET");
    // const dir='C:\Users\Zeyad\Desktop\Semester 6\SE\project\U-CANT-SE-ME'
    // res.sendFile(`C://Users//Zeyad//Desktop//Semester 6//SE//project//U-CANT-SE-ME//result.pdf`);
  });

router.post('/create-pdf', (req, res) => {
    

    pdf.create(toHTML(req.body.name), {}).toFile('result.pdf', (err) => {
       
      if(err) {
          return console.log('error');
      }
  res.send(Promise.resolve())
    });
  });

  

  toHTML = function(data){
    console.log(data);
    return `
    <!doctype html>
    <html>
    <div>
  
      <h1> hey:${data}</h1>
      </div>
      </html>
      `;
  };
module.exports = router;
