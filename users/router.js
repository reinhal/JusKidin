'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {UserInfo} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

