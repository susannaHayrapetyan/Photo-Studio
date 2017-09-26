'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FollowerSchema = new Schema({
	followerID: { 
		type: Schema.Types.ObjectId,
		required : true, 
		ref: 'User'
	},
	followeeID: { 
		type: Schema.Types.ObjectId,
		required : true, 
		ref: 'User'
	},
	status: { 
		type : String, 
		required : true,
		default : 'pending',
		enum: ['pending', 'accepted', 'rejected']
	},
	createdAt: {
		type: Date,
		required : true,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		required : true,
		default: Date.now
	}
});

module.exports = mongoose.model('Follower', FollowerSchema, 'followers');