'use strict';
require('dotenv').config();
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://devUser:thinkful925@ds163480.mlab.com:63480/juskidindev';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://testUser:thinkful1@ds221271.mlab.com:21271/juskidintest';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
exports.AWS_ACCESS_KEYID = process.env.AWS_ACCESS_KEYID;
exports.SECRET_AWS_ACCESS_KEY = process.env.SECRET_AWS_ACCESS_KEY;
