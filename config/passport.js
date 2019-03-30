const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Investor = require('../models/Investor')

module.exports = function(passport){
    passport.use('lawyers',
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            //Match User
            Investor.findOne({ email: email })
            .then(investor => {
                if(!investor){
                    return done(null, false, {message: 'That email is not registered' })
                }

                //Match password
                bcrypt.compare(password, investor.password, (err, isMatch) => {
                    if(err)
                        throw err
                    if(isMatch){
                        return done(null, investor)
                    }
                    else{
                        return done(null, false, {message: 'Password does not match'})
                    }
                })
            })
            .catch(err => console.log(err))
        })
    )
    passport.serializeUser(function(investor, done) {
        done(null, investor.id)
    })
      
    passport.deserializeUser(function(id, done) {
        Investor.findById(id, function(err, investor) {
          done(err, investor)
        })
    })
}
