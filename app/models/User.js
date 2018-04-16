const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		email: DataTypes.STRING,
		password: DataTypes.STRING
	});

	// Class Methods
	User.cryptPassword = (plainText) => {
		return new Promise((resolve, reject) => {
			bcrypt.genSalt(10, (err, salt) => {
				if (err) reject(err);
				else {
					bcrypt.hash(plainText, salt, (err, hash) => {
						if (err) reject(err);
						else resolve(hash);
					});
				}
			});
		});
	};

	// Instance Methods
	User.prototype.authenticate = (plainText,db_password) => {
		return new Promise((resolve, reject) => {
			console.log("plainText",plainText);
			console.log("password",db_password);
			bcrypt.compare(plainText, db_password, (err, res) => {
				if (err) reject(err);
				else resolve(res);
			});
		});
	};

	// Hooks(automatically called)
	User.beforeCreate((user, options) => {
		if (user.password) {
			if (user.password.length >= 6) {
				return User.cryptPassword(user.password)
					.then((hash) => {
						user.password = hash;
					})
					.catch((err) => {
						if (err) throw new Error(err);
					});
			} else {
				throw new Error('Too short password length minimum 6.');
			}
		}
	});

	return User;
};
