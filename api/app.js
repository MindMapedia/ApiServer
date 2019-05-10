require('./models/ideaModel')

const server = require('./server')
const db = require('./db')

const	port = process.env.PORT || 3000
const mongooseUri = 'mongodb://'+(process.env.MONGO_HOST ? process.env.MONGO_HOST :'localhost')+':27017/IdeaDb'

db.connect(mongooseUri, {useNewUrlParser: true})
server.listen(port)

console.log('todo list RESTful API server started on: ' + port)