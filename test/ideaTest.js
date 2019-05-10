const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

const Idea = require ('../api/models/ideaModel')

const server = require('../api/server')
const db = require('../api/db')

const	port = process.env.PORT || 3000
const mongooseUri = 'mongodb://'+(process.env.MONGO_HOST ? process.env.MONGO_HOST :'localhost')+':27017/IdeaDb'

db.connect(mongooseUri, {useNewUrlParser: true})
const serverOn = server.listen(port)

const apiHost = 'http://localhost:'+port
let id = {}
chai.use(chaiHttp)


describe('Ideas', () => {
	beforeEach ((done) => {
		Idea.collection.drop()
		let sampleIdea = new Idea ({title: 'lorem'})
		sampleIdea.save((err,res) => {   
			id.last = res.id
			done()
		})
	})
	after ((done) => {
		serverOn.close()
		db.connection.close()
		done()
	})

	it('should list ALL ideas on /ideas GET', (done)=>{
		chai
			.request(apiHost)
			.get('/ideas')
			.end((err,res) => {
				res.should.have.status(200)
				res.should.be.json
				res.body.should.be.a('array')
				res.body[0].should.have.property('_id')
				res.body[0].should.have.property('title')
				res.body[0].title.should.equal('lorem')
				done()
			})
	})
	it('should list a SINGLE idea on /ideas/<id> GET', (done) => {
		chai
			.request(apiHost)
			.get('/ideas/'+id.last)
			.end((err,res) => {
				res.should.have.status(200)
				res.should.be.json
				res.body.should.be.a('object')
				res.body.should.have.property('_id')
				res.body._id.should.equal(id.last)
				res.body.should.have.property('title')
				res.body.title.should.equal('lorem')
				done()
			})
	})
	it('should add a SINGLE idea on /ideas POST', (done) => {
		chai
			.request(apiHost)
			.post('/ideas')
			.send({title: 'lorem2'})
			.end((err,res)=>{
				res.should.have.status(200)
				res.should.be.json
				res.body.should.be.a('object')
				res.body.should.have.property('_id')
				res.body.should.have.property('title')
				res.body.title.should.equal('lorem2')
				done()        
			})
	})
	it('should update a SINGLE idea on /ideas/<id> PUT',(done) => {
		chai
			.request(apiHost)
			.put('/ideas/'+id.last)
			.send({title: 'lorem2'})
			.end((err,res)=>{
				res.should.have.status(200)
				res.should.be.json
				res.body.should.be.a('object')
				res.body.should.have.property('_id')
				res.body._id.should.equal(id.last)
				res.body.should.have.property('title')
				res.body.title.should.equal('lorem2')
				done()        
			})
	})
	it('should delete a SINGLE idea on /ideas/<id> DELETE', (done) => {
		chai 
			.request (apiHost)
			.delete ('/ideas/'+id.last)
			.end((err,res)=>{
				res.should.have.status(200)
				res.should.be.json
				res.body.should.be.a('object')
				res.body.should.have.property('message')
				res.body.message.should.equal('Idea successfully deleted')
				chai
					.request(apiHost)
					.get('/ideas/'+id.last)
					.end((err,res) => {
						res.should.have.status(200)
						should.equal(res.body, null)
						done()        
					})
			})
	})
})