'use strict';

const mongoose = require('mongoose');

const UploadSchema = mongoose.Schema({
  title: {type: String},
  notes: {type: String},
  dateUploaded: {type: String},
  fileLocation: {type: String},
  drawerTitle: {type: String}
});

const Upload = mongoose.model('Upload', UploadSchema);

module.exports = {Upload, UploadSchema};