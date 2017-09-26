'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhotoSchema = new Schema({
	title: { 
		type : String, 
		default : '', 
		trim : true
	},
	tags: {
		type : [String], 
		default : [],
		validate: [validateTags, 'Tags can include only strings, limit is 20.']
	},
	url : { 
		type : String, 
		required : true 
	},
	privacy: { 
		type : String, 
		required : true,
		default : 'public',
		enum: ['public', 'private', 'followers']
	},
	userID: {
		type: Schema.Types.ObjectId,
		required : true, 
		ref: 'User',
		select: false
	},
	createdAt: {
		type: Date,
		required : true,
		default: Date.now,
		select: false,
		index: true //for effective queries sorted by createdAt field
	}
});

function validateTags(tags){
	if(tags.length > 20)
		return false;

	for(var i in tags){
		if(typeof tags[i] !== 'string' )
			return false;
	}

	return true;
}

module.exports = mongoose.model('Photo', PhotoSchema, 'photos');