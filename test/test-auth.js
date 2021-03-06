'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const { app, runServer, closeServer } = require('../server');
const {UserInfo} = require('../userinfo_model');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Auth endpoints', function () {
  let _id;
  const username = 'exampleUser';
  const password = 'examplePass';
  const firstName = 'Example';
  const lastName = 'User';
  const email= 'example@wwww.com';
  
  before(function () {
    return runServer(TEST_DATABASE_URL);
  });
  
  after(function () {
    return closeServer();
  });
  
  beforeEach(function () {
    return UserInfo.hashPassword(password).then(password =>
      UserInfo.create({
        username,
        password,
        firstName,
        lastName, 
        email
      })
        .then(function (UserInfo) {
          _id = UserInfo._id;
        })
    );
  });
  
  afterEach(function () {
    return UserInfo.remove({});
  });
  
  describe('/api/auth/login', function () {
    it('Should reject requests with no credentials', function () {
      return chai
        .request(app)
        .post('/api/auth/login')
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }
  
          const res = err.response;
          expect(res).to.have.status(400);
        });
    });
    it('Should reject requests with incorrect usernames', function () {
      return chai
        .request(app)
        .post('/api/auth/login')
        .send({ username: 'wrongUsername', password })
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }
  
          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it('Should reject requests with incorrect passwords', function () {
      return chai
        .request(app)
        .post('/api/auth/login')
        .send({ username, password: 'wrongPassword' })
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }
  
          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it('Should return a valid auth token', function () {
      return chai
        .request(app)
        .post('/api/auth/login')
        .send({ username, password })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          const token = res.body.authToken;
          expect(token).to.be.a('string');
          const payload = jwt.verify(token, JWT_SECRET, {
            algorithm: ['HS256']
          });
          console.log('payloud user 105', _id.toString());
          expect(payload.user).to.deep.equal({
            _id: _id.toString(),
            username,
            firstName,
            lastName, 
            email
          });
        });
    });
  });
  
  describe('/api/auth/refresh', function () {
    it('Should reject requests with no credentials', function () {
      return chai
        .request(app)
        .post('/api/auth/refresh')
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }
  
          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it('Should reject requests with an invalid token', function () {
      const token = jwt.sign(
        {
          username,
          firstName,
          lastName
        },
        'wrongSecret',
        {
          algorithm: 'HS256',
          expiresIn: '7d'
        }
      );
  
      return chai
        .request(app)
        .post('/api/auth/refresh')
        .set('Authorization', `Bearer ${token}`)
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }
  
          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it('Should reject requests with an expired token', function () {
      const token = jwt.sign(
        {
          user: {
            username,
            firstName,
            lastName
          },
        },
        JWT_SECRET,
        {
          algorithm: 'HS256',
          subject: username,
          expiresIn: Math.floor(Date.now() / 1000) - 10 // Expired ten seconds ago
        }
      );
  
      return chai
        .request(app)
        .post('/api/auth/refresh')
        .set('authorization', `Bearer ${token}`)
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }
  
          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it('Should return a valid auth token with a newer expiry date', function () {
      const token = jwt.sign(
        {
          user: {
            username,
            firstName,
            lastName
          }
        },
        JWT_SECRET,
        {
          algorithm: 'HS256',
          subject: username,
          expiresIn: '7d'
        }
      );
      const decoded = jwt.decode(token);
  
      return chai
        .request(app)
        .post('/api/auth/refresh')
        .set('authorization', `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          const token = res.body.authToken;
          expect(token).to.be.a('string');
          const payload = jwt.verify(token, JWT_SECRET, {
            algorithm: ['HS256']
          });
          expect(payload.user).to.deep.equal({
            username,
            firstName,
            lastName
          });
          expect(payload.exp).to.be.at.least(decoded.exp);
        });
    });
  });
});
  