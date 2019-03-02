const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

const ExternalEntity = require('../../models/ExternalEntity');
// DB
const externalEntities = [
	new ExternalEntity('Social Insurance Organization', 'Description for what SIO does', 'its socket to communicate with it'),
	new ExternalEntity('Egyptian Tax Authority', 'Description for what ETA does', 'its socket to communicate with it')
];

// GET
router.get('/', (req, res) => {
  /*let data = "";
  externalEntities.forEach((value) => {
    const ID = value.ID;
    const name=value.name;
    data += `<a href="/api/externalEntities/${ID}">${name}</a><br>`;
  });
  */
  res.json({data: externalEntities});
});

// GET Specific External Entity
router.get('/:id', (req, res) => {
  //var data = "";
  let extEntity=null
  externalEntities.forEach((value) => {
    if(value.ID === req.params.id) {
      //data = `Name: ${value.name}<br>Description: ${value.description}<br>Socket: ${value.socket}`;
      extEntity=value;
      return;
    }
  });
  if(extEntity===null)
    return res.status(404).send('External Entity not Found');
  res.json({data: extEntity});
});

// POST
router.post('/', (req, res) => {
	const name = req.body.name;
  const description = req.body.description;
  const socket = req.body.socket;

	const schema = {
		name: Joi.string().min(3).required(),
    description: Joi.string().required(),
    socket: Joi.string().required()
	}

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

	const newExtEntity = {
    id: uuid.v4(),
		name,
    description,
    socket
  };
  externalEntities.push(newExtEntity);
  //var msg = `New External Entity "${name}" was created successfully!<br>it's Description: "${description}"<br>it's socket is "${socket}"`
  return res.json({data: externalEntities});
});

// PUT
router.put('/:id', (req, res) => {
  const id=req.params.id;
  const name=req.body.name;
  const description=req.body.description;
  const socket=req.body.socket;
  var External_Entity=null;
  for(let i=0;i<externalEntities.length;i++){
    if(externalEntities[i].ID===id){
      External_Entity=externalEntities[i];
      break;
    }
  }

  if(External_Entity===null)
    return res.status(404).send('External Entity not Found');

  //let msg = '';
  if(name){
    //msg+=`Name successfully updated! was "${External_Entity.name}" now "${name}"<br>`
    External_Entity.name=name;
  }   
  if(description){
    //msg+=`Description successfully updated! was "${External_Entity.description}" now "${description}"<br>`
    External_Entity.description=description;
  }
  if(socket){
    //msg+=`Socket successfully updated! was "${External_Entity.socket}" now "${socket}"<br>`
    External_Entity.socket=socket;
  }
  res.json({data: External_Entity});
});