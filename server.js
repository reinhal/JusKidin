'use strict';

const express = require('express');
const app = express();
const router = express.Router();

app.use(express.static('public'));

const bodyParser = require('body-parser');
const morgan = require('morgan');

const jsonParser = bodyParser.json();
const {userInfoSchema} = require('./userinfo_model');

app.use(morgan('common'));

app.get('/user-info', (req, res) => {
  res.json(userInfoSchema.get());
});

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

app.post('/user-info', jsonParser, (req, res) => {
  // ensure `firstName' 'lastName' and 'email' are in request body
  const requiredFields = ['firstName', 'lastName', 'email'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = userInfoSchema.create(req.body.firstName, req.body.lastName, req.body.email);
  res.status(201).json(item);
});

app.put('/user-info/:id', jsonParser, (req, res) => {
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
  userInfoSchema.update({
    id: req.params.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email, 
  });
  res.status(204).end();
});

app.delete('/user-info/:id', (req, res) => {
  userInfoSchema.delete(req.params.id);
  console.log(`Deleted user \`${req.params.ID}\``);
  res.status(204).end();
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

module.exports = {app, runServer, closeServer};