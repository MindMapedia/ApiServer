'use strict'

module.exports = function(app) {
	var idea = require('../controllers/ideaController')

	app.route('/ideas')
		.get(idea.listIdeas)
		.post(idea.createIdea)

	app.route('/ideas/:ideaId')
		.get(idea.readIdeabyId)
		.put(idea.updateIdea)
		.delete(idea.deleteIdea)
}
