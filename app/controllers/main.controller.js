const async = require('async');
const _ = require('lodash');
const jwt = require('../../config/jwt');
const db = require('../../config/db');
const path = require('path');

/**
 * GET: /
 *
 **/
module.exports.mainpage = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
};