'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const {ChildProfileSchema} = require('./childprof_model');
const {AssetSchema} = require('./asset_model');
mongoose.Promise = global.Promise;

const userInfoSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true
  },
  firstName: {type: String},  
  lastName: {type: String},
  email: {type: String},
  childProfs: [ChildProfileSchema],
  asset: [AssetSchema]
});

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};
  
UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = {UserInfo};