const uuid = require('uuid')
class Reviewer{
    constructor(id,userName,password,fullName,activeCases,email) {
        this.id =id;
        this.userName = userName;
        this.password = password;
        this.fullName = fullName;
        this.activeCases = activeCases;
        this.email = email;
    };
}

module.exports = Reviewer