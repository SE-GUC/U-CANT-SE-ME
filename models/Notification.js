const uuid = require('uuid')
class Notification 
{
    constructor(message,caseID,emailOfRecipient,recipientID,ID)
    {
        this. emailOfRecipient=emailOfRecipient;
        this.message=message
        this.caseID=caseID;
        this.recipientID=recipientID;
        /* 
            this.ID = uuid.v4();
            I am using a hard coded ID to simplify the testing
        */
        this.ID=ID;
        this.dateSent=new Date();
    };
    
}

module.exports = Notification