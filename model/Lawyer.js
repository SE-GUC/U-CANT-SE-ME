 const uuid = require('uuid')

class Lawyer{
    constructor(fullName,email,userName,password) {
      
         this.id=uuid.v4();
         this.fullName = fullName;
         this.email = email;
         this.userName=userName;
         this.password=password;
        // this.activeCases=new Array();
        
        

    };

};
module.exports = Lawyer