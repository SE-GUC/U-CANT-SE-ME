const express = require('express');
const Joi = require('joi');
const router = express.Router();
const Notification = require('../../models/Notification');

// mock database
const notifications = [
    new Notification("first message","123","hamada@gmail.com","rec","0"),
    new Notification("second message","456","hilal@gmail.com","sender","1"),
    new Notification("third message","caseThree","John@yahoo.com","07775000","2"),
    new Notification("fourth message","caseFier","Cena@yahoo.com","7amada","3"),
];

//Create Notification
router.post('/', (req, res) => {

    const recipientID = req.body.recipientID
    const emailOfRecipient = req.body.emailOfRecipient
    const message = req.body.message
    const caseID = req.body.caseID

    const schema = 
    {
        recipientID: Joi.number().required(),
        emailOfRecipient: Joi.string().email().required(),
        message: Joi.string().required(),
        caseID: Joi.string().required()
    }

    const result = Joi.validate(req.body, schema);

    if(result.error) return res.status(400).send({ error: result.error.details[0].message });
    let ID=notifications.length+"";
    const newNotification = new Notification(message, caseID,emailOfRecipient,recipientID,ID);
    
    notifications.push(newNotification);
    
    return res.json({ data: notifications });
});

// Read Notifications
router.get('/', (req, res) => res.json({ data: notifications }));
// Read a specific Notification
router.get('/:id', (req, res) => {
    const notificationId = req.params.id 
    const notification = notifications.find(notification => notification.ID === notificationId)
    if(!notification)
        res.status(404).send({err: 'There is no notification with the ID you requested'});
    else
        res.json({ data: notification })
})
//Delete a Notification
router.delete('/:id', (req, res) => {
    const notificationId = req.params.id 
    const notification = notifications.find(notification => notification.ID === notificationId)
    const index = notifications.indexOf(notification)
    if(!notification)
        res.status(404).send({err: 'There is no notification with the ID you requested'});
    else
    {
        notifications.splice(index,1)
        res.json({ data: notification })
    }
   
})

// Update a Notification
router.put('/:id', (req, res) => {
    const notificationId = req.params.id 
    const notification = notifications.find(notification => notification.ID === notificationId)
    if (!notification) 
        res.status(404).send({err: 'There is no notification with the ID you requested'});
    else
    {
        const message=req.body.message;
        const caseID=req.body.caseID;
        const emailOfRecipient = req.body.emailOfRecipient;
        const recipientID =req.body.recipientID;
        const schema = {
            message: Joi.string(),
            caseID: Joi.string(),
            emailOfRecipient: Joi.string().email().lowercase(),
            recipientID: Joi.string()
        }
    
        const result = Joi.validate(req.body, schema);
    
        if (result.error) return res.status(400).send({ error: result.error.details[0].message });
        if(message)
            notification.message=message;
        if(caseID)
            notification.caseID=caseID;
        if(emailOfRecipient)
            notification.emailOfRecipient=emailOfRecipient;
        if(recipientID)
            notification.recipientID=recipientID;  
        res.json({ data: notification })
    }
   
})
module.exports = router
