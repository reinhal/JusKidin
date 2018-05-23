'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');

const expect = chai.expect;

chai.use(chaiHttp);

describe('hello world!', function () {
  it('should exist', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });
});

describe('hello world!', function () {
  it('should exist', function () {
    return chai.request(app)
      .get('/assets')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });
});