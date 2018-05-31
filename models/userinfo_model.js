'use strict';

const mongoose = require('mongoose');

const userInfoSchema = mongoose.Schema({
    firstName: {type: String, required: true},  
    lastName: {type: String, required: true},
    email: {type: String, required: true}
});

userInfoSchema.virtual('userNameString').get(function() {
    return `${this.firstName} ${this.lastName}`.trim();
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = {UserInfo};