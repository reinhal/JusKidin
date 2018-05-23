'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');

const expect = chai.expect;

chai.use(chaiHttp);

describe('index page', function () {
  it('should exist', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });
});

describe('asset page', function () {
  it('should exist', function () {
    return chai.request(app)
      .get('/assets')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });
});

describe('developmental page', function () {
  it('should exist', function () {
    return chai.request(app)
      .get('/developmental')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });
});

describe('resources page', function () {
  it('should exist', function () {
    return chai.request(app)
      .get('/resources')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });
});
