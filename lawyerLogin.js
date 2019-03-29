const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Lawyer = require('../models/Lawyer')

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            //Match User
            Lawyer.findOne({ email: email })
            .then(lawyer => {
                if(!lawyer){
                    return done(null, false, {message: 'That email is not registered' })
                }

                //Match password
                bcrypt.compare(password, lawyer.password, (err, isMatch) => {
                    if(err)
                        throw err
                    if(isMatch){
                        return done(null, lawyer)
                    }
                    else{
                        return done(null, false, {message: 'Password does not match'})
                    }
                })
            })
            .catch(err => console.log(err))
        })
    )
    passport.serializeUser(function(lawyer, done) {
        done(null, lawyer.id)
    })

    passport.deserializeUser(function(id, done) {
        Lawyer.findById(id, function(err, lawyer) {
          done(err, lawyer)
        })
    })
}