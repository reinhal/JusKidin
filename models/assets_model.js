'use strict';

const mongoose = require('mongoose');

const assetsSchema = mongoose.Schema({
    title: {type: String, required: true},
    dateUploaded: {type: String, required: true}, 
    fileLocation: {type: String, required: true}
});

assetsSchema.virtual('assetsString').get(function() {
    return `${this.title}`.trim();
});

const Assets = mongoose.model('Assets', assetsSchema);

module.exports = {Assets};