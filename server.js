

const express = require('express');
const app = express();
const { PORT, DATABASE_URL } = require('./config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(express.json());

const jsonParser = bodyParser.json();
const {UserInfo} = require('./userinfo_model');

app.use(morgan('common'));

// Account Info Endpoints//

app.get('/api/account', (req, res) => {
  UserInfo
    .find()
    .select(req.query.select)
    .then(userinfo => {
      console.log(userinfo)
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
    .then(userinfo => {
      console.log(userinfo)
        res.json(userinfo);
      })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.post('/api/account', jsonParser, (req, res) => {
  const requiredFields = ['firstName', 'lastName', 'email'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = UserInfo.create(req.body.firstName, req.body.lastName, req.body.email);
  res.status(201).json(item);
});

app.put('/api/account/:_id', jsonParser, (req, res) => {
  if (req.params._id !== req.body._id) {
    const message = `Request path id (${req.params._id}) and request body id (${req.body._id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  const requiredFields = ['firstName', 'lastName', 'email'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  UserInfo.findByIdAndUpdate(
    req.params._id,
    req.body,
    {new: true},
    (err, requiredFields) => {
      if(err) return res.status(500).send(err)
      res.status(204).end();
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

// // Child Profile Info Endpoints//


// app.post('/api/childProf', jsonParser, (req, res) => {
//   const requiredFields = ['childProfs.firstName', 'childProfs.lastName', 'childProfs.birthDate', 'childProfs.sex'];
//   for (let i=0; i<requiredFields.length; i++) {
//     const field = requiredFields[i];
//     if (!(field in req.body)) {
//       const message = `Missing \`${field}\` in request body`
//       console.error(message);
//       return res.status(400).send(message);
//     }
//   }
//   const item = UserInfo.create(req.body.childProfs.firstName, req.body.childProfs.lastName, req.body.childProfs.birthDate, req.body.childProfs.sex);
//   res.status(201).json(item);
// });

// app.put('/childProf/:_id', jsonParser, (req, res) => {
//   const requiredFields = ['firstName', 'lastName', 'email'];
//   for (let i=0; i<requiredFields.length; i++) {
//     const field = requiredFields[i];
//     if (!(field in req.body)) {
//       const message = `Missing \`${field}\` in request body`
//       console.error(message);
//       return res.status(400).send(message);
//     }
//   }

//   if (req.params._id !== req.body._id) {
//     const message = `Request path id (${req.params._id}) and request body id (${req.body._id}) must match`;
//     console.error(message);
//     return res.status(400).send(message);
//   }
//   console.log(`Updating user info \`${req.params._id}\``);
//   UserInfo.update({
//     id: req.params._id,
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email, 
//   });
//   res.status(204).end();
// });

// app.delete('/childProf/:id', (req, res) => {
//   UserInfo
//   .findByIdAndRemove(req.params.id)
//   .then(() => {
//       res.status(204).json({message: 'Success!!'});
//   })
//   .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'There is an error'});
//   });
// });

// // Digital Assets Endpoints//

// app.get('/api/account?select=asset.title%20asset.dateUploaded%20asset.fileLocation', (req, res) => {
//   UserInfo
//     .find()
//     .select(req.query.select)
//     .then(userinfo => {
//         res.json(userinfo);
//       })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ message: 'Internal server error' });
//     });
// });

// app.post('/api/asset', jsonParser, (req, res) => {
//   const requiredFields = ['firstName', 'lastName', 'email'];
//   for (let i=0; i<requiredFields.length; i++) {
//     const field = requiredFields[i];
//     if (!(field in req.body)) {
//       const message = `Missing \`${field}\` in request body`
//       console.error(message);
//       return res.status(400).send(message);
//     }
//   }
//   const item = UserInfo.create(req.body.firstName, req.body.lastName, req.body.email);
//   res.status(201).json(item);
// });

// app.put('/asset/:_id', jsonParser, (req, res) => {
//   const requiredFields = ['firstName', 'lastName', 'email'];
//   for (let i=0; i<requiredFields.length; i++) {
//     const field = requiredFields[i];
//     if (!(field in req.body)) {
//       const message = `Missing \`${field}\` in request body`
//       console.error(message);
//       return res.status(400).send(message);
//     }
//   }

//   if (req.params._id !== req.body._id) {
//     const message = `Request path id (${req.params._id}) and request body id (${req.body._id}) must match`;
//     console.error(message);
//     return res.status(400).send(message);
//   }
//   console.log(`Updating user info \`${req.params._id}\``);
//   UserInfo.update({
//     id: req.params._id,
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email, 
//   });
//   res.status(204).end();
// });

// app.delete('/asset/:id', (req, res) => {
//   UserInfo
//   .findByIdAndRemove(req.params.id)
//   .then(() => {
//       res.status(204).json({message: 'Success!!'});
//   })
//   .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'There is an error'});
//   });
// });

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


