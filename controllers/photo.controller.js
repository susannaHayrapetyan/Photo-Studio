'use strict';

var config = require('../config/config');
var Photo = require('../models/photo');
var uuidv4 = require('uuid/v4');
var storage = require('@google-cloud/storage')();
var gcloud, bucket;

//Gcloud authentication.

gcloud = require('gcloud').storage({
  projectId: config.auth.google.projectId,
  keyFilename: config.auth.google.keyFilename
});

bucket = gcloud.bucket(config.auth.google.bucket);

// Create new photo.

exports.create = function(req, res, next) {
	var blob, blobStream, blobName = uuidv4();

	// Check if image was uploaded.

	if (!req.file) 
	    return res.json({success: false, message: 'No image uploaded.'});
	
	//Check if user is logged in.

	if(!req.user.id)
		return res.json({success: false, message: 'Please login to add images.'});	

	//A little validation of image type.

	switch(req.file.mimetype){
		case 'image/jpeg':
			blobName += '.jpg';
			break;
		case 'image/png':
			blobName += '.png';
			break;
		default:
			blobName +='.jpg';
			break;
	}

	var blob = bucket.file(blobName);
	var blobStream = blob.createWriteStream();
	
	blobStream.on('error', function(err) {
		res.json({success: false, message: 'Cannot upload file.'});
	});

	blobStream.on('finish', function() {
		var newPhoto = new Photo();

		newPhoto.title = req.body.title;
		newPhoto.tags = req.body.tags;
		newPhoto.url = config.auth.google.storageUrl + bucket.name + '/' + blobName;
		newPhoto.userID = req.user.id;

		newPhoto.save(function(err, doc){
			if(err)
				return res.json({success: false, message: err.message});

			res.json({success: true, data: doc});
		})
	});

	blobStream.end(req.file.buffer);
};

// GET photos list or single photo by id, user id, limit, lastID parameters.

exports.get = function(req, res, next) {
	var limit = parseInt(req.query.limit) || 100;
	var lastID = req.query.lastID;
	var query = {
		userID : req.locals.userID || req.params.userID
	};
	
	// Use instead of skip() for fast execution

	if(lastID) 
		query._id = { $gt: lastID };

	// Search single photo by id.

	if(req.params.id)
		query._id = req.params.id;

	// Searching for followee user photos

	if(req.params.userID && req.locals.isFollowee) 
		query.privacy = { $in: ['public', 'followers'] }

	// Searching for not followee user photos

	else if(req.params.userID) 
		query.privacy = 'public';

	Photo
	.find(query)
	.sort({createdAt : -1})
	.limit(limit)
	.exec(function(err, photos){
		if(err)
			return res.json({success: false});

		res.json({success: true, data: photos});
	})
};

// Update photo by id, user id.

exports.update = function(req, res, next) {
	var query = {
		_id : req.params.id,
		userID : req.user.id
	}, $set = {};
	
	// Set all fields which needs to be updated.

	if(req.body.title)
		$set.title = req.body.title;
	if(req.body.tags && req.body.tags instanceof Array)
		$set.tags = req.body.tags;
	if(req.body.privacy)
		$set.privacy = req.body.privacy;

	Photo
	.update(query, {$set: $set})
	.exec(function(err){
		if(err)
			return res.json({success: false, message: err.message});

		res.json({success: true});
	})
};


// Delete photo by id, user id.

exports.delete = function(req, res, next) {
	var query = {
		_id : req.params.id,
		userID : req.user.id
	};
	
	Photo
	.remove(query)
	.exec(function(err){
		if(err)
			return res.json({success: false, message: err.message});

		// TODO: also remove from Google Cloud

		res.json({success: true});
	})
};