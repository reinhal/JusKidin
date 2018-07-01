'use strict';

const express = require('express');
const app = express();
const { PORT, DATABASE_URL } = require('./config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(express.json());

const jsonParser = bodyParser.json();
const {UserInfo} = require('./userinfo_model');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

app.use('/api/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

passport.use(localStrategy); 
passport.use(jwtStrategy);

app.use(morgan('common'));

// Account Info Endpoints//

// if(user.password === req.body.password) {
//   // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
//   var payload = {id: user.id};
//   var token = jwt.sign(payload, jwtOptions.secretOrKey);
//   res.json({message: "ok", token: token});
// } else {
//   res.status(401).json({message:"passwords did not match"});
// }
// });

app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

app.get('/api/account', (req, res) => {
  UserInfo
    .find()
    .select(req.query.select)
    .then(userinfo => {
        res.json(userinfo);
      })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });

});

app.get('/api/account/:_id', (req, res) => {
  UserInfo
    .findOne({
      "_id": req.params._id
    })
    .select(req.query.select)
    .then(userinfo => {
        res.json(userinfo);
      })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.post('/api/account', jsonParser, (req, res) => {
  console.log('UserInfo 70', UserInfo);
  const requiredFields = ['username', 'password', 'firstName', 'lastName', 'email'];
  const missingField = requiredFields.find(field => !(field in req.body));
  
  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }

  const stringFields = ['username', 'password', 'firstName', 'lastName', "email"];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }

  const explicityTrimmedFields = ['username','password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
  }

  const sizedFields = {
    username: {
      min: 1
    },
    password: {
      min: 10,
      // bcrypt truncates after 72 characters, so let's not give the illusion
      // of security by storing extra (unused) info
      max: 72
    }
  };

  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
  );

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField]
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }

  let {username, password, firstName = '', lastName = '', email = ''} = req.body;
  // Username and password come in pre-trimmed, otherwise we throw an error
  // before this
  firstName = firstName.trim();
  lastName = lastName.trim();
  
  return UserInfo.find({username})
    .count()
    .then(count => {
      if (count > 0) {
        // There is an existing user with the same username
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username'
        });
      }
      // If there is no existing user, hash the password
      return UserInfo.hashPassword(password);
    })
    
    .then(hash => {
      return UserInfo.create({
        _id,
        username,
        password: hash,
        firstName,
        lastName,
        email
      });
    })
    .then(user => {
      return res.status(201).json(user.serialize());
    })
    .catch(err => {
      // Forward validation errors on to the client, otherwise give a 500
      // error because something unexpected has happened
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });

    console.log('UserInfo 189', UserInfo);

    UserInfo.create({username: req.body.username, password: req.body.password, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email})
    .then(function(newUser) {
      res.status(201).json(newUser);
    });
});

// router.post ('/') has to merge with app.post('/api/account')
// become one
// what is the new name for the routes? (considering what depends on the route)
// code needs to update to change the names
// what parts of the program will be affected, so I can 

app.put('/api/account/:_id', jsonParser, (req, res) => {
  if (req.params._id !== req.body._id) {
    const message = `Request path id (${req.params._id}) and request body id (${req.body._id}) must match`;
    return res.status(400).send(message);
  }
  const updatedUser = ['firstName', 'lastName', 'email'];
  for (let i=0; i<updatedUser.length; i++) {
    const field = updatedUser[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      return res.status(400).send(message);
    }
  }
  UserInfo.findByIdAndUpdate(
    req.params._id,
    req.body,
    {new: true},
    (err, updatedUser) => {
      if(err) {
        return res.status(500).send(err)
      } 
      res.status(204).send(updatedUser);
    }
  )
});
// api/account/:id/asset/:WHATEVER THE IDENTIFIER
app.delete('/api/account/:id', (req, res) => {
  UserInfo
  .findByIdAndRemove(req.params.id)
  .then(() => {
      res.status(204).json({message: 'Success!!'});
  })
  .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'There is an error'});
  });
});

/////////// Child Profile Info Endpoints /////////////////////////////////////

app.post('/api/account/:_id/childProfiles', jsonParser, (req, res) => {
  const reqChildProfs = [req.body.firstName, req.body.birthDate];
  for (let i=0; i<reqChildProfs.length; i++) {
    const field = reqChildProfs[i];
    if (field == undefined) {
      const message = `Missing \`${field}\` in request body`
      return res.status(400).send(message);
    } 
    UserInfo
      .find({
        "_id": req.params._id
      })
      .then( function (data) {
        const duplicateList = data[0].childProfs.filter( 
          o => o.firstName === reqChildProfs[i] );

          if (duplicateList.length > 1) {
            return res.status(422).json({
              code: 422,
              reason: 'ValidationError',
              message: 'Child name already taken',
              location: 'firstName'
            });
          }
        // data[0].childProfs.includes({
        //   firstName: req.body.firstName
        // })
      // );  
        return UserInfo
        .findOne({
          "_id": req.params._id
        })
        .select(req.query.select)
        .then(userinfo => {
          userinfo.childProfs.push({firstName: req.body.firstName, birthDate: req.body.birthDate});
          userinfo.save()
            res.status(201);
            res.json(userinfo);
          })
        .catch(err => {
        });
      })
  }
});

app.put('/api/account/:_id/childProfs/:child_id', jsonParser, (req, res) => {
  if (req.params.childProfs !== req.body.childProfs) {
    const message = `Request path id (${req.params.childProf}) and request body id (${req.body.childProfs}) must match`;
    return res.status(400).send(message);
  }

  const updatedChildObject = ['firstName','birthDate'];
    for (let i=0; i<updatedChildObject.length; i++) {
      const field = updatedChildObject[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        return res.status(400).send(message);
      }
  }

  return UserInfo.findById(
    req.params._id)
    .then(thisUser => {
    for ( let i=0; i < thisUser.childProfs.length; i++ ) {
      if (req.params.child_id == thisUser.childProfs[i]._id) {
        thisUser.childProfs[i].firstName = req.body.firstName;
        thisUser.childProfs[i].birthDate = req.body.birthDate;
      }
    }

  return UserInfo.findByIdAndUpdate(
    req.params._id, {
      childProfs:thisUser.childProfs
    }
  ) 
    .then(updatedChild => {
      return res.status(201).send(updatedChild);
    })
  })
});

app.delete('/api/account/:_id/childProfs/:child_id', (req, res) => {
  UserInfo
  .findOne({
    "_id": req.params._id
  })
  .then(userinfo => {
    for (let index = 0; index < userinfo.childProfs.length; index++) {
      if(userinfo.childProfs[index].id === req.params.child_id){
        userinfo.childProfs.splice(index,1)
      }      
    }
    userinfo.save()
      res.status(204);
      res.json(userinfo);
    })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

// // Digital Assets Endpoints//

app.post('/api/account/:_id/uploads', jsonParser, (req, res) => {
  const updatedAssetObject = [req.body.title, req.body.notes, req.body.dateUploaded, req.body.fileLocation, req.body.drawerTitle];
  for (let i=0; i<updatedAssetObject.length; i++) {
    const field = updatedAssetObject[i];
    if (field == undefined) {
      const message = `Missing \`${field}\` in request body`
      return res.status(400).send(message);
    }
  }
  UserInfo
    .findOne({
      "_id": req.params._id
    })
    .select(req.query.select)
    .then(userinfo => {
      userinfo.asset.push({title: req.body.title, notes: req.body.notes, dateUploaded: req.body.dateUploaded, fileLocation: req.body.fileLocation, drawerTitle: req.body.drawerTitle});
      userinfo.save()
        res.status(201);
        res.json(userinfo);
      })
    .catch(err => {
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.put('/api/account/:_id/uploads/:assetIndex', jsonParser, (req, res) => {
  if (+req.params.assetIndex !== req.body.assetIndex) {
    const message = `Request path id (${req.params.assetIndex}) and request body id (${req.body.assetIndex}) must match`;
    console.error('this is the:', message);
    return res.status(400).send(message);
  }

  const updatedAssetObject = ["title", "notes", "dateUploaded", "fileLocation", "drawerTitle"];
  for (let i=0; i<updatedAssetObject.length; i++) {
    const field = updatedAssetObject[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      return res.status(400).send(message);
    }
  }

  return UserInfo.findById(
    req.params._id)
    .then(thisAsset => {
    for ( let i=0; i < thisAsset.asset.length; i++ ) {
      if (req.params.asset_id == thisAsset.asset[i].id) {
       thisAsset.asset[i].title = req.body.title;
       thisAsset.asset[i].notes = req.body.notes;
       thisAsset.asset[i].dateUploaded = req.body.dateUploaded;
       thisAsset.asset[i].fileLocation = req.body.fileLocation;
       thisAsset.asset[i].drawerTitle = req.body.drawerTitle;
      }
    }
     let update = {"$set": {}};
     update["$set"]["asset."+ req.params.assetIndex] = {
       title: req.body.title,
       notes: req.body.notes, 
       dateUploaded: req.body.dateUploaded, 
       fileLocation: req.body.fileLocation, 
       drawerTitle: req.body.drawerTitle
     }
  return UserInfo.findByIdAndUpdate(
    req.params._id, update
  ) 
    .then(updatedAsset => {
      return res.status(201).send(updatedAsset);
    })
  })
});

app.delete('/api/account/:_id/uploads/:asset_id', (req, res) => {
  UserInfo
  .findOne({
    "_id": req.params._id
  })
  .then(userinfo => {
    for (let index = 0; index < userinfo.asset.length; index++) {
      if(userinfo.asset[index].id === req.params.asset_id){
        userinfo.asset.splice(index,1)
      }      
    }
    userinfo.save()
      res.status(204);
      res.json(userinfo);
    })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

let server;

function runServer(DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL, 8080).catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};