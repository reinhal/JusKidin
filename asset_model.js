'use strict';

const mongoose = require('mongoose');

const AssetSchema = mongoose.Schema({
  title: {type: String},
  notes: {type: String},
  dateUploaded: {type: String},
  fileLocation: {type: String},
  drawerTitle: {type: String}
});

const Asset = mongoose.model('Asset', AssetSchema);

module.exports = {Asset, AssetSchema};