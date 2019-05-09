var chai = require('chai')
var chaiHttp = require('chai-http')
var Idea = require('../api/models/IdeaModel')
require('../')
var should = chai.should()
// @toto change var to let or const

const apiHost = 'http://localhost:3000'
let id = {}
chai.use(chaiHttp)


describe('Ideas', () => {
	beforeEach ( (done) => {
		Idea.collection.drop
		let sampleIdea = new Idea ({title: 'lorem'})
		sampleIdea.save((err,res) => {   
			id.last = res.id
			done()
		} )
	}
	)

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