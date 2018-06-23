'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
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
    childProfs: [
        {
            firstName: {type: String},  
            birthDate: {type: String},
        }
    ],
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

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};
  
UserSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = {UserInfo};