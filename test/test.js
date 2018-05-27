'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server.js');

const expect = chai.expect;

chai.use(chaiHttp);
var requester = chai.request(app).keepOpen();

Promise.all([
  describe('index page', function () {
    before(function() {
      return runServer();
    });
    after(function() {
      return closeServer();
    });
    it('should exist', function () {
      return chai.request(app)
        requester.get('/')
        .then(function (res) {
          expect(res).to.have.status(200);
        });
    });
  }),
  describe('asset page', function () {
    before(function() {
      return runServer();
    });
    after(function() {
      return closeServer();
    });
    it('should exist', function () {
      return chai.request(app)
        requester.get('/assets')
        .then(function (res) {
          expect(res).to.have.status(200);
        });
    });
  }),
  describe('resources page', function () {
    before(function() {
      return runServer();
    });
    after(function() {
      return closeServer();
    });
    it('should exist', function () {
      return chai.request(app)
        requester.get('/resources')
        .then(function (res) {
          expect(res).to.have.status(200);
        });
    });
  }),
  describe('developmental page', function () {
    before(function() {
      return runServer();
    });
    after(function() {
      return closeServer();
    });
    it('should exist', function () {
      return chai.request(app)
        requester.get('/developmental')
        .then(function (res) {
          expect(res).to.have.status(200);
        });
    });
  })
])
.then(() => requester.close())
