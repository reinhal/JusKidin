'use strict';

const mongoose = require('mongoose');

const userInfoSchema = mongoose.Schema({
    id: {type: Number},
    firstName: {type: String, required: true},  
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    childProfs: [
        {
            id: {type: Number},
            firstName: {type: String, required: true},  
            lastName: {type: String, required: true},
            birthDate: {type: String, required: true},
            sex: {type: String, required: true}
        }
    ],
    asset: [
        {
            title: {type: String, required: true},
            dateUploaded: {type: String, required: true},
            fileLocation: {type: String, required: true}
        }
    ]
});

userInfoSchema.virtual('userNameString').get(function() {
    return `${this.firstName} ${this.lastName}`.trim();
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

childProfSchema.virtual('childNameString').get(function() {
    return `${this.firstName}`.trim();
});

const ChildProf = mongoose.model('ChildProf', childProfSchema);

assetsSchema.virtual('assetsString').get(function() {
    return `${this.title}`.trim();
});

const Assets = mongoose.model('Assets', assetsSchema);

module.exports = {Assets};
module.exports = {ChildProf};
module.exports = {UserInfo};