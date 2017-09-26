"use strict";

var jwt = require('jsonwebtoken');

var config = require('../config/config');
var Follower = require('../models/follower');

// Check if token is valid or not.

exports.verifyToken = function(req, res, next) {
  var token = req.query.access_token;

  jwt.verify(token, config.auth.secretKey, function(err, decoded) {
    if(err)
      return next(err);

    req.user = decoded;
    req.locals = {};

    next();
  });
  
}

// Set current user id if it's equal to 'me'

exports.verifyUser = function(req, res, next){

  if(!req.params.userID)
    return next();

	if(req.params.userID === 'me'){
    req.locals.userID = req.user.id;

    return next()
  }

  Follower
  .findOne({
    followerID: req.user.id,
    followeeID: req.params.userID,
    status: 'active'
  })
  .exec(function(err, follower){
    
    if(follower)
      req.locals.isFollowee = true;

    next();
  })
 	
}