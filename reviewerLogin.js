const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Reviewer = require('../models/Reviewer')

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            //Match User
            Reviewer.findOne({ email: email })
            .then(reviewer => {
                if(!reviewer){
                    return done(null, false, {message: 'That email is not registered' })
                }

                //Match password
                bcrypt.compare(password, reviewer.password, (err, isMatch) => {
                    if(err)
                        throw err
                    if(isMatch){
                        return done(null, reviewer)
                    }
                    else{
                        return done(null, false, {message: 'Password does not match'})
                    }
                })
            })
            .catch(err => console.log(err))
        })
    )
    passport.serializeUser(function(reviewer, done) {
        done(null, reviewer.id)
    })

    passport.deserializeUser(function(id, done) {
        Reviewer.findById(id, function(err, reviewer) {
          done(err, reviewer)
        })
    })
}