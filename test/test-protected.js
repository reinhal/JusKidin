'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const { app, runServer, closeServer } = require('../server');
const {UserInfo} = require('../userinfo_model');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Protected endpoint', function () {
    const username = 'exampleUser';
    const password = 'examplePass';
    const firstName = 'Example';
    const lastName = 'User';
    const email = "example@wwww.com";
  
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
      );
    });
  
    afterEach(function () {
      return UserInfo.remove({});
    });
  
    describe('/api/protected', function () {
        it('Should reject requests with no credentials', function () {
            return chai
                .request(app)
                .get('/api/protected')
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
                .get('/api/protected')
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
                    exp: Math.floor(Date.now() / 1000) - 10 // Expired ten seconds ago
                },
                JWT_SECRET,
                {
                    algorithm: 'HS256',
                    subject: username
                }
            );
  
        return chai
          .request(app)
          .get('/api/protected')
          .set('authorization', `Bearer ${token}`)
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }
  
            const res = err.response;
            expect(res).to.have.status(401);
          });
        });
        it.only('Should send protected data', function () {
            const token = jwt.sign(
                {
                    user: {
                    username,
                    firstName,
                    lastName, 
                    email
                    }
                },
                JWT_SECRET,
                {
                    algorithm: 'HS256',
                    subject: username,
                    expiresIn: '7d'
                }
            );
  
            return chai
                .request(app)
                .get('/api/protected')
                .set('authorization', `Bearer ${token}`)
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.data).to.equal('rosebud');
                });
        });
    });
});
  