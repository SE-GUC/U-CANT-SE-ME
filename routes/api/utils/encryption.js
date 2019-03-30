const bcrypt = require('bcryptjs')

//passes abc12345678 and returns the hashedPassword 
exports.hashPassword = function(password){
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    return hashedPassword
}

//password takes unhashed password i.e abc12345678
//hashedPassword takes in the hashedPassword from the DB
//returns true if match else false
exports.comparePassword = function(password, hashedPassword, cb) {
    bcrypt.compare(password, hashedPassword, function(err, isMatch) {
        if (err) 
            return cb(err)
        cb(null, isMatch)
    })
}
