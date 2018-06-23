'use strict';

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

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

userInfoSchema.virtual('userNameString').get(function() {
    return `${this.firstName}`.trim();
});

userInfoSchema.virtual('childNameString').get(function() {
    return `${this.childProfs.firstName}`.trim();
});

userInfoSchema.virtual('assetsString').get(function() {
    return `${this.asset.title}`.trim();
});

module.exports = {UserInfo};
