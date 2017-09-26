'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

	/* GET users listing. */
router.get('/facebook', passport.authenticate('facebook', { session:false, scope: [ 'email', 'public_profile' ] }) );

router.get('/facebook/callback', passport.authenticate('facebook', {
	    failureRedirect : '/',
	    session:false
	}),
	/*Add access token on success redirect.*/
	function(req, res) {
		var token = jwt.sign({ id: req.user._id }, config.auth.secretKey, { expiresIn: '24h' });

		res.redirect( '/profile/?access_token=' + token );
	});

module.exports = router;
