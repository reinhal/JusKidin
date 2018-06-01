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

const UserInfo = mongoose.model('UserInfo', userInfoSchema);
const ChildProf = mongoose.model('ChildProf', userInfoSchema);
const ChildAge = mongoose.model('ChildAge', userInfoSchema);
const Assets = mongoose.model('Assets', userInfoSchema);

userInfoSchema.virtual('userNameString').get(function() {
    return `${this.firstName} ${this.lastName}`.trim();
});

userInfoSchema.virtual('childNameString').get(function() {
    return `${this.childProfs.firstName}`.trim();
});

userInfoSchema.virtual('childAge').get(function() {

});

userInfoSchema.virtual('assetsString').get(function() {
    return `${this.asset.title}`.trim();
});

module.exports = {Assets};
module.exports = {ChildProf};
module.exports = {UserInfo};