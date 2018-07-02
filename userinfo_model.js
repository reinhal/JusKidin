'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userInfoSchema = mongoose.Schema({
    // _id: {
    //     type: Schema.Types.ObjectId
    // },
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

userInfoSchema.methods.serialize = function() {
    return {
        _id: this._id || '',
        username: this.username || '',
        // password: this.password || '',
        firstName: this.firstName || '',
        lastName: this.lastName || '',
        email: this.email || ''
    };
};

userInfoSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};
  
userInfoSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = {UserInfo};
