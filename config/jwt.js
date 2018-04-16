const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports.generate = (data) => {
	return jwt.sign(data, config.session.secretKey, { expiresIn: '6h' });
};

module.exports.verify = (token) => {
	try {
		let decoded = jwt.verify(token, config.session.secretKey);
		return decoded;
	} catch(err) {
		return false;
	}
};