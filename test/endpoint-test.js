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

function generateBirthDate() {
  const birthDate = [
    '05/23/14', '08/11/11', '11/17/08', '02/18/12', '10/09/16'];
  return birthDate[Math.floor(Math.random() * birthDate.length)];
}

function generateSex() {
  const sex = [
    'male', 'female'];
  return sex[Math.floor(Math.random() * sex.length)];
}

function generateTitle() {
  const title = [
    'Soccer Game', 'Birthday Party', 'School Project', 'Animal Research', 'Math Test'];
  return title[Math.floor(Math.random() * title.length)];
}

function generateDateUploaded() {
  const dateUploaded = [
    '04/13/16', '07/11/15', '03/27/17', '02/18/18', '01/29/14'];
  return dateUploaded[Math.floor(Math.random() * dateUploaded.length)];
}

function generateUserInfoData() {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        childProfs: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          birthDate: generateBirthDate(),
          sex: generateSex()
        },
        asset: {
          title: generateTitle(),
          dateUploaded: generateDateUploaded(),
          fileLocation: faker.image.nature()
        }
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
            //.select(res.query.select)
            .get('/api/account')
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
            .get('/api/account')
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
    describe('POST endpoint', function() {
      it('should add a new user', function() {

          const newUser = generateUserInfoData();

          return chai.request(app)
              .post('/api/account')
              .send(newUser)
              .then(function(res) {
                  expect(res).to.have.status(201);
                  expect(res).to.be.json;
                  expect(res.body).to.be.a('object');
                  expect(res.body).to.include.keys(
                    'firstName', 'lastName', 'email');
                  expect(res.body.id).to.not.be.null;
                  expect(res.body.firstName).to.equal(newUser.firstName);
                  expect(res.body.lastName).to.equal(newUser.lastName);
                  expect(res.body.email).to.equal(newUser.email); 
                  return res.body;
          })
          .then(function(UserInfo) {
              console.log(newUser, UserInfo);
              expect(UserInfo.firstName).to.equal(newUser.firstName);
              expect(UserInfo.lastName).to.equal(newUser.lastName);
              expect(UserInfo.email).to.equal(newUser.email);
          });
      });
    });
    describe('DELETE endpoint', function() {
        
        it('should delete user info by id', function() {
    
          let userinfo;
    
          return UserInfo
            .findOne()
            .then(function(_userinfo) {
              userinfo = _userinfo;
              return chai.request(app).delete(`/api/account/${userinfo._id}`);
            })
            .then(function(res) {
              expect(res).to.have.status(204);
              return UserInfo.findById(userinfo._id);
            })
            .then(function(_userinfo) {
              expect(_userinfo).to.be.null;
            });
        });
    });
});