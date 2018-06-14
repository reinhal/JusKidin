'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server.js');

const expect = chai.expect;

chai.use(chaiHttp);
var requester = chai.request(app).keepOpen();

Promise.all([
  describe('index page', function () {
    it('should exist', function () {
      return chai.request(app)
        requester.get('/')
        .then(function (res) {
          expect(res).to.have.status(200);
        });
    });
  }),
  describe('asset page', function () {
    it('should exist', function () {
      return chai.request(app)
        requester.get('/assets')
        .then(function (res) {
          expect(res).to.have.status(200);
        });
    });
  }),
  describe('google search page', function () {
    it('should exist', function () {
      return chai.request(app)
        requester.get('/gsearch')
        .then(function (res) {
          expect(res).to.have.status(200);
        });
    });
  }),
  describe('search results page', function () {
    it('should exist', function () {
      return chai.request(app)
        requester.get('/searchresults')
        .then(function (res) {
          expect(res).to.have.status(200);
        });
    });
  })
])
.then(() => requester.close())