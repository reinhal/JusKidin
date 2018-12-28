'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {ChildProfile} = require('./model');

const router = express.Router();

const jsonParser = bodyParser.json();