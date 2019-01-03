'use strict';

//move over to server.js
//no model changes
//make sure to get the file location on s3
const express = require('express');
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('./config');

aws.config.update({
  secretAccessKey: config.SECRET_AWS_ACCESS_KEY,
  accessKeyId: config.AWS_ACCESS_KEYID,
  region: 'us-east-1'
});

var app = express(),
  s3 = new aws.s3();

app.use(bodyParser.json());


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'juskidinuploads',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

app.get(`api/account/${userID}?select=asset`, function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/api/account/:_id/uploads', upload.array('uploadFile', 1), function (req, res, next) {
  //var req.file show the file info to this location, save that ID
  //test in postman
  res.send('File uploaded successfully to Amazon s3 server!');
});

module.exports = upload;

//make sure you know the user id