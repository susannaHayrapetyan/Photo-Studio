'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: { 
		type : String, 
		default : '', 
		trim : true
	},
	surname: {
		type : String, 
		default : '', 
		trim : true
	},
	username: { 
		type : String, 
		lowercase: true, 
		trim : true 
	},
	profilePicture: { 
		type : String, 
		default : ''
	},
	facebookID: {
		type : String, 
		required : true
	}
});

UserSchema.virtual('fullName').get(function () {
  return this.name + ' ' + this.surname;
});

module.exports = mongoose.model('User', UserSchema, 'users');