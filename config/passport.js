'use strict';

var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var config = require('./config');

module.exports = function(passport) {

    // used to serialize the user
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
        clientID        : config.auth.facebook.clientID,
        clientSecret    : config.auth.facebook.clientSecret,
        callbackURL     : config.auth.facebook.callbackURL,
		profileFields: ["id", "email", "first_name", "last_name", "photos"]
    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
	    
	    // find the user in the database based on their facebook id
        User.findOne({ facebookID : profile.id }, function(err, user) {

            // if there is an error, stop everything and return that
            if (err)
                return done(err);

            // if the user is found, then log them in
            if (user) 
                return done(null, user); 
            
            // if there is no user found with that facebook id, create them
            var newUser = new User();

            // set all of the facebook information in our user model
            newUser.facebookID = profile.id;               
            newUser.name  = profile.name.givenName;
            newUser.surname = profile.name.familyName 
            newUser.username = profile.emails ? profile.emails[0].value : '';
            newUser.profilePicture = profile.photos ? profile.photos[0].value : '';

            // save our user to the database
            newUser.save(function(err) {
                if (err)
                    throw err;

                // if successful, return the new user
                return done(null, newUser);
            });

        });
    }));

};