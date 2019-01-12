'use strict';

//move over to server.js
//no model changes
//make sure to get the file location on s3
const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('./config');

AWS.config.update({
  secretAccessKey: config.SECRET_AWS_ACCESS_KEY,
  accessKeyId: config.AWS_ACCESS_KEYID,
  region: 'us-east-1'
});

const s3 = new AWS.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
}

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

// const singleUpload = upload.single('image');

// app.post('/image-upload', function(req, res) {
//   console.log('made it here', req.body);
//   singleUpload(req, res, function(err, some) {
//     if (err) {
//       return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
//     }

//     return res.json({'imageUrl': req.file.location});
//   });
// });

// app.get(`api/account/:_id?select=asset`, function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

// app.post('/api/account/:_id/asset', upload.array('uploadFile', 1), function (req, res, next) {
//   //var req.file show the file info to this location, save that ID
//   //test in postman
//   res.send('File uploaded successfully to Amazon s3 server!');
// });

module.exports = upload;

//make sure you know the user id