const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const tokenKey = require('./keys').secretOrKey

const Investor = require('../models/Investor')
const Reviewer = require('../models/Reviewer')
const Admin = require('../models/Admin')
const Lawyer = require('../models/Lawyer')

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = tokenKey

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
                    {
                        throw err
                    }   
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
    passport.use('lawyers',
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            //Match User
            Lawyer.findOne({ email: email })
            .then(lawyer => {
                if(!lawyer){
                    console.log(lawyer)
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
    passport.serializeUser(function(lawyer, done) {
        done(null, lawyer.id)
    })
      
    passport.deserializeUser(function(id, done) {
        Lawyer.findById(id, function(err, lawyer) {
          done(err, lawyer)
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
    passport.use('adminAuth',new JwtStrategy(opts, async (jwtPayload, done) => {
        console.log("adminAuth")
        const currentUser = await Admin.findById(jwtPayload.id)
        if(currentUser) return done(null,currentUser)
        return done(null,false)
     }))
    passport.use('reviewerAuth',new JwtStrategy(opts, async (jwtPayload, done) => {
        console.log("reviewerAuth")
        const currentUser = await Reviewer.findById(jwtPayload.id)
        if(currentUser) return done(null,currentUser)
        return done(null,false)
     }))
    passport.use('lawyerAuth',new JwtStrategy(opts, async (jwtPayload, done) => {
        console.log("lawyerAuth")
        const currentUser = await Lawyer.findById(jwtPayload.id)
        if(currentUser) return done(null,currentUser)
        return done(null,false)
     }))
}