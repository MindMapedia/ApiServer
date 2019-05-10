'use strict'

const mongoose = require('mongoose'),
	Idea = mongoose.model('Ideas')

exports.listIdeas = function (req, res) {
	Idea.find({}, function (err, idea) {
		if (err)
			res.send(err)
		res.json(idea)
	})
}

exports.createIdea = function (req, res) {
	let new_idea = new Idea(req.body)
	new_idea.save(function (err, idea) {
		if (err)
			res.send(err)
		res.json(idea)
	}) 
}

exports.readIdeabyId = function (req, res) {
	Idea.findById(req.params.ideaId, function (err, idea) {
		if (err)
			res.send(err)
		res.json(idea)
	})
}

exports.updateIdea = function (req, res) {
	Idea.findOneAndUpdate({_id:req.params.ideaId}, req.body, {new: true}, function (err, idea) {
		if (err)
			res.send(err)
		res.json(idea)
	})
}

exports.deleteIdea = function (req, res) {
	Idea.deleteOne({
		_id: req.params.ideaId
	}, function (err) {
		if (err)
			res.send(err)
		res.json({ message: 'Idea successfully deleted' })
	})
}
