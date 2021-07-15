'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const { dbConfig } = require("./../../configs");
const db = {};


if (dbConfig.use_env_variable) {
	db.sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
	db.sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}

(async () => {
	await db.sequelize.authenticate();
	console.log('Database Connection has been established successfully.');
})()
try {
	fs.readdirSync(__dirname)
		.filter(file => {
			return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
		})
		.forEach(file => {
			db[file.split(".")[0]] = require("./" + file)(db.sequelize, Sequelize);
		});

	Object.keys(db).forEach(modelName => {
		if (db[modelName].associate) {
			db[modelName].associate(db);
		}
	});
} catch (error) {
	console.error(' Error in models ', error.message);
}




module.exports = db;
