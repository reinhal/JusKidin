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

var userID = '5b22a73ffb6efb156dcee37b';

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
      return runServer(DATABASE_URL);
    });
  
    beforeEach(function() {
      return seedUserInfoData();
    });
  
    afterEach(function() {
      //return tearDownDb();
    });
  
    after(function() {
      //tearDownDb();
      //return closeServer();
    });

  describe('POST endpoint', function() {
    it('should add a new childProfile', function() {

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
  describe('DELETE endpoint', function() {
      
      it('should delete child profile by id', function() {
  
        let childprofile;
  
        return UserInfo
          .findOne()
          .then(function(_childprofile) {
            childprofile = _childprofile;
            return chai.request(app).delete(`/api/${userID}/childProf`);
          })
          .then(function(res) {
            expect(res).to.have.status(204);
            return UserInfo.findById(childprofile._id);
          })
          .then(function(_childprofile) {
            expect(UserInfo._childprofile).to.be.undefined;
            //COME AND CHECK ___ PROFILE
          });
      });
  });
});

// describe('Asset API resource', function() {
    
//   before(function() {
//       return runServer(DATABASE_URL);
//     });
  
//     beforeEach(function() {
//       return seedUserInfoData();
//     });
  
//     afterEach(function() {
//       //return tearDownDb();
//     });
  
//     after(function() {
//       return closeServer();
//     });

//   describe('POST endpoint', function() {
//     it('should add a new digital asset', function() {

//         const newAsset = generateAssetData();

//         return chai.request(app)
//             .post(`/api/${userID}/asset`)
//             .send(newAsset)
//             .then(function(res) {
//                 expect(res).to.have.status(201);
//                 expect(res).to.be.json;
//                 expect(res.body).to.be.a('object');
//                 expect(res.body).to.include.keys('title', 'dateUploaded', 'fileLocation');
//                 expect(res.body.id).to.not.be.null;
//                 expect(res.body.asset[1].title).to.equal(newAsset.title);
//                 expect(res.body.asset[1].notes).to.equal(newAsset.notes);
//                 expect(res.body.asset[1].dateUploaded).to.equal(newAsset.dateUploaded);
//                 expect(res.body.asset[1].fileLocation).to.equal(newAsset.fileLocation);
//                 expect(res.body.asset[1].drawerTitle).to.equal(newAsset.drawerTitle); 
//                 return res.body;
//             })
//     });
//   });
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
// });