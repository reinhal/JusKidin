'use strict';

const mongoose = require('mongoose');

const gSearchSchema = mongoose.Schema({
    firstName: {type: String, required: true},  
    lastName: {type: String, required: true},
    email: {type: String, required: true}
});

gSearchSchema.virtual('gSearchTitleString').get(function() {
    return `${this.title}`.trim();
});

const GoogleSearch = mongoose.model('GoogleSearch', gSearchSchema);

module.exports = {GoogleSearch};