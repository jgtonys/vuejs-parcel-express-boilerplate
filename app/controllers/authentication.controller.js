const async = require('async');
const _ = require('lodash');

const jwt = require('../../config/jwt');
const db = require('../../config/db');
const User = db.User;

module.exports.requireLogin = (req, res, next) => {
	//let token = req.headers.bearer;
	let token_temp = req.headers.cookie.split("token")[1];
	let token = token_temp.substring(9).split("%22%7D")[0];
	//console.log(req.headers);
	//console.log("user token : " + token);
	let user = null;
	if (!token || !(user = jwt.verify(token))) {
		next({statusCode: 403, message: 'require login'});
	} else {
		req.user = user;
		res.send(user);
		next();
	}
};