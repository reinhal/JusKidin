'use strict';

const mongoose = require('mongoose');

const childProfileSchema = mongoose.Schema({
  firstName: {type: String},  
  birthDate: {type: String}
});

const ChildProfile = mongoose.model('ChildProfile', childProfileSchema);

module.exports = {ChildProfile};