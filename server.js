'use strict';

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

//UserInfo.create({
//  "firstName": "Swarming",
//  "lastName": "Hive",
//  "email": "sb@thehive.com"
//});

////////////////////////////////////////////////////////////////////////////////////////
//////////  Account Info Endpoints /////////////////////////////////////////////////////

app.get('/account', (req, res) => {
  UserInfo
    .find()
    .then(userinfo => {
        res.json(userinfo);
      })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.post('/account', jsonParser, (req, res) => {
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

app.put('/account/:_id', jsonParser, (req, res) => {
  const requiredFields = ['firstName', 'lastName', 'email'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  if (req.params.id !== req.body.id) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating user info \`${req.params.id}\``);
  UserInfo.update({
    id: req.params.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email, 
  });
  res.status(204).end();
});

app.delete('/account/:id', (req, res) => {
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
