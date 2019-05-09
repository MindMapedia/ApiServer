'use strict'


var mongoose = require('mongoose')
var Schema = mongoose.Schema

var IdeaSchema = new Schema({
	title: {
		type: String,
		Required: 'IdeaTitle'
	},
	Create_date: {
		type: Date,
		default: Date.now
	}
})


module.exports = mongoose.model('Ideas', IdeaSchema)