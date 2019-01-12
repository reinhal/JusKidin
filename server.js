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

app.use('/api/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

passport.use(localStrategy); 
passport.use(jwtStrategy);

app.use(morgan('common'));

// Account Info Endpoints//

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

app.get('/api/account/:_id', jwtAuth, (req, res) => {
 
  UserInfo
    .findOne({
      '_id': req.user._id
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

  const stringFields = ['username', 'password', 'firstName', 'lastName', 'email'];
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
        username,
        password: hash,
        firstName,
        lastName,
        email
      });
    })
    .then(user => {
      console.log( '185 user', user);
      console.log('186 user', user.serialize());
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
});

app.put('/api/account/:_id', [jsonParser, jwtAuth],(req, res) => {
  console.log ('200', req.params.id, req.body.id);
  
  var passed = false;
  var tempUser = {};

  const updatedUser = ['username', 'firstName', 'lastName', 'email'];
  for (let i=0; i<updatedUser.length; i++) {
    const field = updatedUser[i];
    if (field in req.body) {
      passed = true;
      tempUser[field] = req.body[field];
    }
  }

  if (!passed) {
    const message = 'Request is missing information.';
    return res.status(400).send(message);
  }

  UserInfo.findByIdAndUpdate(
    req.params._id,
    tempUser,
    {new: true},
    (err, updatedUser) => {
      if(err) {
        return res.status(500).send(err);
      } 
      res.status(204).send(updatedUser);
    }
  );
});

app.delete('/api/account/:_id', jwtAuth, (req, res) => {
  UserInfo
    .findByIdAndRemove(req.params._id)
    .then(() => {
      res.status(204).json({message: 'Success!!'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'There is an error'});
    });
});

/////////// Child Profile Info Endpoints /////////////////////////////////////

app.post('/api/account/:_id/childProfiles', [jsonParser, jwtAuth], (req, res) => {

  const reqChildProfs = [req.body.firstName, req.body.birthDate];
  for (let i=0; i<reqChildProfs.length; i++) {
    const field = reqChildProfs[i];
    if (field === undefined) {
      const message = `Missing \`${field}\` in request body`;
      return res.status(400).send(message);
    } 
  }

  UserInfo
    .find({
      '_id': req.params._id
    })
    .then( function (data) {
      const duplicateList = data[0].childProfs.filter( 
        o => o.firstName === req.body.firstName );

      if (duplicateList.length > 1) {
        return res.status(422).json({
          code: 422,
          reason: 'ValidationError',
          message: 'Child name already taken',
          location: 'firstName'
        });
      }
      return UserInfo
        .findOneAndUpdate({
          '_id': req.params._id
        },
        { $addToSet:
          {
            'childProfs': {
              firstName: req.body.firstName,
              birthDate: req.body.birthDate
            }
          }
        },
        { new: true })
        .then(userinfo => {
          res.status(201);
          res.json(userinfo);
          console.log('userinfo', userinfo);
        })
        .catch(err => {
          console.log('error', err);
        });
    });
});

app.put('/api/account/:_id/childProfs/:child_id', [jsonParser, jwtAuth], (req, res) => {
  console.log('request', req.params, req.body);
  UserInfo.findById(req.params._id)
    .then(userinfo => {
      userinfo.childProfs.id(req.params.child_id).set(req.body);
      userinfo.save(err => {
        if(err) {
          res.send(err);
        }
        res.json(userinfo.childprofs);
      });
    });
});

app.delete('/api/account/:_id/childProfs/:child_id', jwtAuth, (req, res) => {
  console.log('request.user', req.params);
  UserInfo.findById(req.params._id)
    .then(userinfo => {
      userinfo.childProfs.id(req.params.child_id).remove();
      userinfo.save(err => {
        if(err) {
          res.send(err);
        }
        res.json(userinfo.childprofs);
      });
    });
});


///////////// Digital Assets Endpoints//////////////////////////////////
// AWS.config.update({
//   secretAccessKey: config.SECRET_AWS_ACCESS_KEY,
//   accessKeyId: config.AWS_ACCESS_KEYID,
//   region: 'us-east-1'
// });

// const s3 = new AWS.S3();

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'juskidinuploads',
//     acl: 'public-read',
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString());
//     }
//   })
// });

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// });

// const storage = cloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: 'JusKidin'
// });

// const parser = multer({ storage: storage });

// app.post('/api/images', parser.single('image'), (req, res) => {
//   console.log(req.file);
//   // to see what is returned to you
//   const image = {};
//   image.url = req.file.url;
//   image.id = req.file.public_id;

//   Image.create(image) // save image information in database
//     .then(newImage => res.json(newImage))
//     .catch(err => console.log(err));
// });

app.post('/api/account/:_id/uploads', [jsonParser, jwtAuth], (req, res) => {
  const updatedAssetObject = [req.body.title, req.body.notes, req.body.fileLocation, req.body.drawerTitle];
  for (let i=0; i<updatedAssetObject.length; i++) {
    const field = updatedAssetObject[i];
    if (field === undefined) {
      const message = `Missing \`${field}\` in request body`;
      return res.status(400).send(message);
    }
  }
  UserInfo
    .findOne({
      '_id': req.params._id
    })
    .select(req.query.select)
    .then(userinfo => {
      userinfo.asset.push({title: req.body.title, notes: req.body.notes, fileLocation: req.body.fileLocation, drawerTitle: req.body.drawerTitle});
      userinfo.save();
      res.status(201);
      res.json(userinfo);
    })
    .catch(err => {
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.put('/api/account/:_id/asset/:upload_id', [jsonParser, jwtAuth ], (req, res) => {
  console.log('request', req.params, req.body);
  UserInfo.findById(req.params._id)
    .then(userinfo => {
      userinfo.asset.id(req.params.upload_id).set(req.body);
      userinfo.save(err => {
        if(err) {
          res.send(err);
        }
        res.json(userinfo.asset);
      });
    });
});

app.delete('/api/account/:_id/asset/:upload_id', jwtAuth, (req, res) => {
  console.log('request.user', req.params);
  UserInfo.findById(req.params._id)
    .then(userinfo => {
      userinfo.asset.id(req.params.upload_id).remove();
      userinfo.save(err => {
        if(err) {
          res.send(err);
        }
        res.json(userinfo.asset);
      });
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
  runServer(DATABASE_URL, PORT).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};