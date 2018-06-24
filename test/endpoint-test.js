'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const expect = chai.expect;

const {UserInfo} = require('../userinfo_model');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

var userID = '';

function seedUserInfoData() {
    const seedData = [];
  
    for (let i=1; i<=10; i++) {
      seedData.push(generateUserInfoData());
    }
    return UserInfo.insertMany(seedData).then(user => {
      return userID = user[0]._id;
    });
}

function generateBirthDate() {
  const birthDate = [
    '05/23/14', '08/11/11', '11/17/08', '02/18/12', '10/09/16'];
  return birthDate[Math.floor(Math.random() * birthDate.length)];
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

function generateDrawerTitle() {
  const drawerTitle = [
    'Soccer 2016', 'First Grade Stella', 'Family Events', 'Everyday 2018', 'Fifth Grade Finn'];
  return drawerTitle[Math.floor(Math.random() * drawerTitle.length)];
}

function generateUserInfoData() {
    return {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        childProfs: {
          firstName: faker.name.firstName(),
          birthDate: generateBirthDate(),
        },
        asset: {
          title: generateTitle(),
          dateUploaded: generateDateUploaded(),
          fileLocation: faker.image.nature(),
          drawerTitle: generateDrawerTitle()
        }
    }
}

function generateNewChild() {
  return {
  firstName: faker.name.firstName(),
  birthDate: generateBirthDate()
  }
}

function generateAssetData() {
  return {
    title: generateTitle(),
    dateUploaded: generateDateUploaded(),
    fileLocation: faker.image.nature(),
    drawerTitle: generateDrawerTitle()
  }
}
function tearDownDb() {
    return mongoose.connection.dropDatabase();
}

describe('UserInfo API resource', function() {
    
    before(function() {
        return runServer(TEST_DATABASE_URL);
      });
    
      beforeEach(function() {
        return seedUserInfoData();
      });
    
      afterEach(function() {
        return tearDownDb();
      });
    
      after(function() {
        return closeServer();
      });

    describe('GET endpoint', function() {

        it('should return all existing accounts', function() {
          let res;
          return chai.request(app)
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
              expect(resAccount.firstName).to.equal(userinfo.firstName);
              expect(resAccount.lastName).to.equal(userinfo.lastName);
              expect(resAccount.email).to.equal(userinfo.email);
            });
        });
    });
    describe('/api/account', function () {
      describe('POST endpoint', function() {
        it('should add a new user', function() {

            const newUser = generateUserInfoData();
            delete newUser.childProfs;
            delete newUser.asset;

            return chai.request(app)
                .post('/api/account')
                .send(newUser)
                .then(function(res) {
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.include.keys(
                      'username', 'firstName', 'lastName', 'email');
                    expect(res.body.id).to.not.be.null;
                    expect(res.body.username).to.equal(newUser.username);
                    expect(res.body.firstName).to.equal(newUser.firstName);
                    expect(res.body.lastName).to.equal(newUser.lastName);
                    expect(res.body.email).to.equal(newUser.email); 
                    return res.body;
            })
        });
        it('Should reject users with missing username', function () {

          const newUser = generateUserInfoData();
          delete newUser.username;

          return chai
            .request(app)
            .post('/api/account')
            .send( newUser )
            .catch(err => {
              if (err instanceof chai.AssertionError) {
                throw err;
              }
  
              const res = err.response;
              expect(res).to.have.status(422);
              expect(res.body.reason).to.equal('ValidationError');
              expect(res.body.message).to.equal('Missing field');
              expect(res.body.location).to.equal('username');
            });
        });
        it('Should reject users with missing password', function () {

          const newUser = generateUserInfoData();
          delete newUser.password;
         
          return chai
            .request(app)
            .post('/api/users')
            .send( newUser )
            .catch(err => {
              if (err instanceof chai.AssertionError) {
                throw err;
              }
  
              const res = err.response;
              expect(res).to.have.status(422);
              expect(res.body.reason).to.equal('ValidationError');
              expect(res.body.message).to.equal('Missing field');
              expect(res.body.location).to.equal('password');
            });
        });
        it('Should reject users with non-string username', function () {

          const newUser = generateUserInfoData();
          newUser.username = 1234;
         
          return chai
            .request(app)
            .post('/api/users')
            .send( newUser )
            .catch(err => {
              if (err instanceof chai.AssertionError) {
                throw err;
              }
  
              const res = err.response;
              expect(res).to.have.status(422);
              expect(res.body.reason).to.equal('ValidationError');
              expect(res.body.message).to.equal(
                'Incorrect field type: expected string'
              );
              expect(res.body.location).to.equal('username');
            });
        });
        it('Should reject users with non-string password', function () {

          const newUser = generateUserInfoData();
          newUser.password = 1234;

          return chai
            .request(app)
            .post('/api/users')
            .send( newUser )
            // .then(() =>
            //   expect.fail(null, null, 'Request should not succeed')
            // )
            .catch(err => {
              if (err instanceof chai.AssertionError) {
                throw err;
              }
  
              const res = err.response;
              expect(res).to.have.status(422);
              expect(res.body.reason).to.equal('ValidationError');
              expect(res.body.message).to.equal(
                'Incorrect field type: expected string'
              );
              expect(res.body.location).to.equal('password');
            });
        });
        it('Should reject users with non-string first name', function () {

          const newUser = generateUserInfoData();
          newUser.firstName = 1234;

          return chai
            .request(app)
            .post('/api/users')
            .send( newUser )
            // .then(() =>
            //   expect.fail(null, null, 'Request should not succeed')
            // )
            .catch(err => {
              if (err instanceof chai.AssertionError) {
                throw err;
              }
  
              const res = err.response;
              expect(res).to.have.status(422);
              expect(res.body.reason).to.equal('ValidationError');
              expect(res.body.message).to.equal(
                'Incorrect field type: expected string'
              );
              expect(res.body.location).to.equal('firstName');
            });
        });
        it('Should reject users with non-string last name', function () {

          const newUser = generateUserInfoData();
          newUser.lastName = 1234;

          return chai
            .request(app)
            .post('/api/users')
            .send( newUser )
            .catch(err => {
              if (err instanceof chai.AssertionError) {
                throw err;
              }
  
              const res = err.response;
              expect(res).to.have.status(422);
              expect(res.body.reason).to.equal('ValidationError');
              expect(res.body.message).to.equal(
                'Incorrect field type: expected string'
              );
              expect(res.body.location).to.equal('lastName');
            });
        });
        it('Should reject users with non-trimmed username', function () {

          const newUser = generateUserInfoData();
          newUser.username = " username ";

          return chai
            .request(app)
            .post('/api/users')
            .send( newUser )
            .catch(err => {
              if (err instanceof chai.AssertionError) {
                throw err;
              }
  
              const res = err.response;
              expect(res).to.have.status(422);
              expect(res.body.reason).to.equal('ValidationError');
              expect(res.body.message).to.equal(
                'Cannot start or end with whitespace'
              );
              expect(res.body.location).to.equal('username');
            });
        });
        it('Should reject users with non-trimmed password', function () {

          const newUser = generateUserInfoData();
          newUser.password = " password ";

          return chai
            .request(app)
            .post('/api/users')
            .send( newUser )
            .catch(err => {
              if (err instanceof chai.AssertionError) {
                throw err;
              }
  
              const res = err.response;
              expect(res).to.have.status(422);
              expect(res.body.reason).to.equal('ValidationError');
              expect(res.body.message).to.equal(
                'Cannot start or end with whitespace'
              );
              expect(res.body.location).to.equal('password');
            });
        });
        it('Should reject users with empty username', function () {

          const newUser = generateUserInfoData();
          newUser.username = " ";

          return chai
            .request(app)
            .post('/api/users')
            .send( newUser )
            .catch(err => {
              if (err instanceof chai.AssertionError) {
                throw err;
              }
  
              const res = err.response;
              expect(res).to.have.status(422);
              expect(res.body.reason).to.equal('ValidationError');
              expect(res.body.message).to.equal(
                'Must be at least 1 characters long'
              );
              expect(res.body.location).to.equal('username');
            });
        });
        it('Should reject users with password less than ten characters', function () {

          const newUser = generateUserInfoData();
          newUser.password = '123456789';

          return chai
            .request(app)
            .post('/api/users')
            .send( newUser )
            .catch(err => {
              if (err instanceof chai.AssertionError) {
                throw err;
              }
  
              const res = err.response;
              expect(res).to.have.status(422);
              expect(res.body.reason).to.equal('ValidationError');
              expect(res.body.message).to.equal(
                'Must be at least 10 characters long'
              );
              expect(res.body.location).to.equal('password');
            });
        });
        it('Should reject users with password greater than 72 characters', function () {

          const newUser = generateUserInfoData();
          newUser.password = new Array(73).fill('a').join('');

          return chai
            .request(app)
            .post('/api/users')
            .send( newUser )
            .catch(err => {
              if (err instanceof chai.AssertionError) {
                throw err;
              }
  
              const res = err.response;
              expect(res).to.have.status(422);
              expect(res.body.reason).to.equal('ValidationError');
              expect(res.body.message).to.equal(
                'Must be at most 72 characters long'
              );
              expect(res.body.location).to.equal('password');
            });
        });
        it('Should reject users with duplicate username', function () {

          const newUser = generateUserInfoData();
          newUser.username = "sameuser";

          return chai .request(app).post('/api/users').send( newUser )
            .then(() =>
              chai.request(app).post('/api/users').send( newUser )
            )
            .catch(err => {
              if (err instanceof chai.AssertionError) {
                throw err;
              }
  
              const res = err.response;
              expect(res).to.have.status(422);
              expect(res.body.reason).to.equal('ValidationError');
              expect(res.body.message).to.equal(
                'Username already taken'
              );
              expect(res.body.location).to.equal('username');
            });
        });
        it('Should create a new user', function () {

          const newUser = generateUserInfoData();
          delete newUser.childProfs;
          delete newUser.asset;

          return chai
            .request(app)
            .post('/api/account')
            .send( newUser )
            .then(res => {
              expect(res).to.have.status(201);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.keys(
                'username',
                'firstName',
                'lastName',
                'email'
              );
              expect(res.body.username).to.equal(newUser.username);
              expect(res.body.firstName).to.equal(newUser.firstName);
              expect(res.body.lastName).to.equal(newUser.lastName);
              expect(res.body.email).to.equal(newUser.email);
              return UserInfo.findOne({
                username: newUser.username
              });
            })
            .then(user => {
              expect(user).to.not.be.null;
              expect(user.firstName).to.equal(newUser.firstName);
              expect(user.lastName).to.equal(newUser.lastName);
              expect(user.email).to.equal(newUser.email);
              return user.validatePassword(newUser.password);
            })
            .then(passwordIsCorrect => {
              expect(passwordIsCorrect).to.be.true;
            });
        });
        it('Should trim firstName and lastName', function () {

          const newUser = generateUserInfoData();
          newUser.firstName = ` ${newUser.firstName} `,
          newUser.lastName =  ` ${newUser.lastName} `

          return chai
            .request(app)
            .post('/api/account')
            .send( newUser )
            .then(res => {
              expect(res).to.have.status(201);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.keys(
                'username',
                'firstName',
                'lastName',
                "email"
              );
              expect(res.body.username).to.equal(newUser.username);
              expect(res.body.firstName).to.equal(newUser.firstName.trim());
              expect(res.body.lastName).to.equal(newUser.lastName.trim());
              expect(res.body.email).to.equal(newUser.email);
              return UserInfo.findOne({
                username: newUser.username
              });
            })
            .then(newUser => {
              expect(newUser).to.not.be.null;
              expect(newUser.firstName).to.equal(newUser.firstName.trim());
              expect(newUser.lastName).to.equal(newUser.lastName.trim());
            });
        });
      });
      describe('PUT endpoint', function() {
        it('should update the user', function() {
          this.timeout(4000);
          const updatedUser = generateUserInfoData();
          return UserInfo
            .findOne()
            .then(function(userinfo) {
              updatedUser._id = userinfo._id;
              return chai.request(app)
                .put(`/api/account/${userinfo._id}`)
                .send(updatedUser);
            })
            .then(function(res) {
              expect(res).to.have.status(204);
              return UserInfo.findById(updatedUser._id);
            })
            .then(function(userinfo) {
              expect(userinfo.firstName).to.equal(updatedUser.firstName);
              expect(userinfo.lastName).to.equal(updatedUser.lastName);
              expect(userinfo.email).to.equal(updatedUser.email);
            });
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

describe('Child Profile API resource', function() {
    
  before(function() {
      return runServer(TEST_DATABASE_URL);
    });
  
    beforeEach(function() {
      return seedUserInfoData();
    });
  
    afterEach(function() {
      return tearDownDb();
    });
  
    after(function() {
      tearDownDb();
      return closeServer();
    });

  describe('POST endpoint', function() {
    it.skip('should add a new childProfile', function() {

        const newChild = generateNewChild();

        return chai.request(app)
            .post(`/api/${userID}/childProf`)
            .send(newChild)
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body.childProfs[0]).to.include.keys('firstName', 'birthDate');
                expect(res.body.id).to.not.be.null;
                expect(res.body.childProfs[1].firstName).to.equal(newChild.firstName);
                expect(res.body.childProfs[1].birthDate).to.equal(newChild.birthDate); 
                return res.body;
        })
    });
  });
  // describe('PUT endpoint', function() {
  //   it('should update a child', function() {
  //     this.timeout(4000);

  //     const updatedChild = generateNewChild();
  //     return UserInfo
  //       .findOne()
  //       .then(function(userinfo) {
  //         updatedChild._id = userID;
  //         userinfo.childProfs[0] = updatedChild
          
  //         return chai.request(app)
  //           .put(`/api/${userID}/childProf`)
  //           .send(userinfo)
  //           .then(function(data){
  //             return data
  //           })
  //       })
  //       .then(function(res) {
  //         //expect(res).to.have.status(204);
  //         return UserInfo.findById(updatedChild._id);
  //       })
  //       .then(function(userinfo) {
  //         console.log(userinfo)
  //         console.log(updatedChild)
  //         expect(userinfo.childProfs[0].firstName).to.equal(updatedChild.firstName);
  //         expect(userinfo.childProfs[0].birthDate).to.equal(updatedChild.birthDate);
  //       })
  //   });
  // });
  // describe('DELETE endpoint', function() {
      
  //     it('should delete child profile by id', function() {
  
  //       let childprofile;
  
  //       return UserInfo
  //         .findOne()
  //         .then(function(_childprofile) {
  //           childprofile = _childprofile;
  //           return chai.request(app).delete(`/api/${userID}/childProf`);
  //         })
  //         .then(function(res) {
  //           expect(res).to.have.status(204);
  //           return UserInfo.findById(childprofile._id);
  //         })
  //         .then(function(_childprofile) {
  //           expect(UserInfo._childprofile).to.be.undefined;
  //           //COME AND CHECK ___ PROFILE
  //         });
  //     });
  // });
});

describe('Asset API resource', function() {
    
  before(function() {
      return runServer(TEST_DATABASE_URL);
    });
  
    beforeEach(function() {
      return seedUserInfoData();
    });
  
    afterEach(function() {
      return tearDownDb();
    });
  
    after(function() {
      return closeServer();
    });

  describe('POST endpoint', function() {
    it.skip('should add a new digital asset', function() {

        const newAsset = generateAssetData();

        return chai.request(app)
            .post(`/api/${userID}/asset`)
            .send(newAsset)
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('title', 'dateUploaded', 'fileLocation');
                expect(res.body.id).to.not.be.null;
                expect(res.body.asset[1].title).to.equal(newAsset.title);
                expect(res.body.asset[1].notes).to.equal(newAsset.notes);
                expect(res.body.asset[1].dateUploaded).to.equal(newAsset.dateUploaded);
                expect(res.body.asset[1].fileLocation).to.equal(newAsset.fileLocation);
                expect(res.body.asset[1].drawerTitle).to.equal(newAsset.drawerTitle); 
                return res.body;
            })
    });
  });
//   describe('PUT endpoint', function() {
//     it('should update a digital asset', function() {
//       this.timeout(4000);
//       const updatedAsset = generateAssetData();
//       return UserInfo.asset
//       .findOne()
//       .then(function(userinfo) {
//         asset._id = userinfo._id;
//         return chai.request(app)
//           .put(`/api/${userID}/asset/`)
//           .send(updatedAsset);
//       })
//       .then(function(res) {
//         expect(res).to.have.status(204);
//         return UserInfo.asset.findById(updatedAsset._id);
//       })
//       .then(function(userinfo) {
//         expect(userinfo.Asset.title).to.equal(updatedAsset.title);
//         expect(res.body.asset[1].notes).to.equal(newAsset.notes);
//         expect(userinfo.Asset.dateUploaded).to.equal(updatedAsset.dateUploaded);
//         expect(userinfo.Asset.fileLocation).to.equal(updatedAsset.fileLocation);
//         expect(res.body.asset[1].drawerTitle).to.equal(newAsset.drawerTitle);
//       });
//     });
//   });
//   describe('DELETE endpoint', function() {
//     it('should delete digital asset by id', function() {
//       let userinfo;
//       return UserInfo.asset
//       .findOne()
//       .then(function(_userinfo) {
//         userinfo = _userinfo;
//         return chai.request(app).delete(`/api/${userID}/asset`);
//       })
//       .then(function(res) {
//         expect(res).to.have.status(204);
//         return UserInfo.asset.findById(userinfo.asset._id);
//       })
//       .then(function(_userinfo) {
//         expect(_userinfo.asset).to.be.null;
//       });
//     });
//   });
});