const uuid = require('uuid')

// The Admin Model
//should we add any more attributes?
class Admin {
    constructor(userName, fullName, password) {
        this.userName = userName;
        this.fullName = fullName;
        this.password = password;
        this.id = uuid.v4();
    };
};

module.exports = Admin