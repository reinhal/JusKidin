'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://devUser:thinkful925@ds163480.mlab.com:63480/juskidindev';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://testUser:thinkful1@ds239940.mlab.com:39940/juskidin';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';