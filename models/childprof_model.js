'use strict';

const mongoose = require('mongoose');

const childProfSchema = mongoose.Schema({
    firstName: {type: String, required: true},  
    lastName: {type: String, required: true},
    age: {type: Number, required: true},
    sex: {type: String, required: true}
});

childProfSchema.virtual('childNameString').get(function() {
    return `${this.firstName}`.trim();
});

const ChildProf = mongoose.model('ChildProf', childProfSchema);

module.exports = {ChildProf};