const uuid = require('uuid')
class Reviewer{
    constructor(userName,password,fullName,email) {
        this.id =uuid.v4();
        this.userName = userName;
        this.password = password;
        this.fullName = fullName;
        this.email = email;
    };
}

module.exports = Reviewer