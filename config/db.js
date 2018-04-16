const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const config = require('./config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
	dialect: 'sqlite',
  storage: './test.sqlite',
	// timezone: 'Asia/Seoul',
	logging: process.env.NODE_ENV == 'production' ? false : console.log
});
const modelPath = path.join(__dirname, '../app/models/');

let models = {};
fs.readdirSync(modelPath).forEach((file) => {
	let modelName = file.split('.')[0];
	models[modelName] = sequelize.import(modelPath + file);
});

Object.keys(models).forEach((modelName) => {
	if (models[modelName].associate) {
		models[modelName].associate(models);
	}
});

module.exports = _.extend(models, { Sequelize, sequelize });
