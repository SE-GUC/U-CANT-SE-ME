const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Investor = require('../models/Investor')

module.exports = function(passport){
    passport.use('investors',
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
    passport.use('reviewers',
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

    passport.use('lawyers',
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
    
    // passport.use('lawyer', )
    passport.serializeUser(function(investor, done) {
        done(null, investor.id)
    })
      
    passport.deserializeUser(function(id, done) {
        Investor.findById(id, function(err, investor) {
          done(err, investor)
        })
    })
    passport.use('admins',
        new LocalStrategy({ usernameField: 'username'}, (username, password, done) => {
            //Match User
            Admin.findOne({ username: username })
            .then(admin => {
                if(!admin){
                    return done(null, false, {message: 'That username is not registered' })
                }
                //Match password
                bcrypt.compare(password, admin.password, (err, isMatch) => {
                    if(err)
                    {
                        throw err
                    }    
                    if(isMatch){
                        return done(null, admin)
                    }
                    else{
                        return done(null, false, {message: 'Password does not match'})
                    }
                })
            })
            .catch(err => console.log(err))
        })
    )
    passport.serializeUser(function(admin, done) {
        done(null, admin.id)
    })

    passport.deserializeUser(function(id, done) {
        Admin.findById(id, function(err, admin) {
          done(err, admin)
        })
    })
}
