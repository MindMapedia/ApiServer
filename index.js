var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Idea = require('./api/models/IdeaModel'),
  bodyParser = require('body-parser')

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false);
let mongooseUri = 'mongodb://'+(process.env.MONGO_HOST ? process.env.MONGO_HOST :'localhost' )+':27017/IdeaDb'
mongoose.connect(mongooseUri, {useNewUrlParser: true})


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


var routes = require('./api/routes/IdeaRoutes')
routes(app)

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port)

console.log('todo list RESTful API server started on: ' + port)