'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const expect = chai.expect;

const {UserInfo} = require('../userinfo_model');
const {app, runServer, closeServer} = require('../server');
const {DATABASE_URL} = require('../config');

chai.use(chaiHttp);

function seedUserInfoData() {
    console.info('seeding account data');
    const seedData = [];
  
    for (let i=1; i<=10; i++) {
      seedData.push(generateUserInfoData());
    }
    return UserInfo.insertMany(seedData);
}


function generateUserInfoData() {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email()
    }
}

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

describe('UserInfo API resource', function() {
    
    before(function() {
        return runServer(DATABASE_URL);
      });
    
      beforeEach(function() {
        return seedUserInfoData();
      });
    
      afterEach(function() {
        //return tearDownDb();
      });
    
      after(function() {
        return closeServer();
      });

    describe('GET endpoint', function() {

        it('should return all existing accounts', function() {
          let res;
          return chai.request(app)
            .get('/account')
            .then(function(_res) {
              res = _res;
              expect(res).to.have.status(200);
              expect(res.body).to.have.lengthOf.at.least(1);
              return UserInfo.count();
            })
            .then(function(count) {
              expect(res.body).to.have.lengthOf(count);
            });
        });

        it('should return account info with the right fields', function() {
          let resAccount;
          return chai.request(app)
            .get('/account')
            .then(function(res) {
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(res.body).to.be.a('array');
              expect(res.body).to.have.lengthOf.at.least(1);

              res.body.forEach(function(userinfo) {
                expect(userinfo).to.be.a('object');
                expect(userinfo).to.include.keys('firstName', 'lastName', 'email');
              });
              resAccount = res.body[0];
              return UserInfo.findById(resAccount._id);
            })
            .then(function(userinfo) {
                console.log(userinfo, 'userinfo');
              expect(resAccount.firstName).to.equal(userinfo.firstName);
              expect(resAccount.lastName).to.equal(userinfo.lastName);
              expect(resAccount.email).to.equal(userinfo.email);
            });
        });
    });
    describe('DELETE endpoint', function() {
        
        it('delete user info by id', function() {
    
          let userinfo;
    
          return UserInfo
            .findOne()
            .then(function(_userinfo) {
              userinfo = _userinfo;
              return chai.request(app).delete(`/account/${userinfo._id}`);
            })
            .then(function(res) {
              expect(res).to.have.status(204);
              return UserInfo.findById(userinfo.id);
            })
            .then(function(_userinfo) {
              expect(_userinfo).to.be.null;
            });
        });
    });
});