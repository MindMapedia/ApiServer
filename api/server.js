const express = require('express')
const app = express()
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const routes = require('./routes/ideaRoutes')
routes(app)
app.use(function (req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
})

module.exports = app