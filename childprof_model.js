'use strict';

const mongoose = require('mongoose');

const ChildProfileSchema = mongoose.Schema({
  firstName: {type: String},  
  birthDate: {type: String}
});

const ChildProfile = mongoose.model('ChildProfile', ChildProfileSchema);

module.exports = {ChildProfile, ChildProfileSchema};