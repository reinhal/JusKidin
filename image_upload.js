'use strict';

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('./config');

aws.config.update({
  secretAccessKey: config.SECRET_AWS_ACCESS_KEY,
  accessKeyId: config.AWS_ACCESS_KEYID,
  region: 'us-east-1'
});

const s3 = new aws.s3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed'), false);
  }
};

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

module.exports = upload;