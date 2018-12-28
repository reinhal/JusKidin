'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const {ChildProfileSchema} = require('./child/model');
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
  childProfs: [{ChildProfileSchema}],
  asset: [
    {
      title: {type: String},
      notes: {type: String},
      dateUploaded: {type: String},
      fileLocation: {type: String},
      drawerTitle: {type: String}
    }
  ]
});

//subdocuments mongoose
//childProfs[Child model]
//user.expenses.id(req.body.ChildID).remove()
//res.json(user.expenses)

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};
  
UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = {UserInfo};