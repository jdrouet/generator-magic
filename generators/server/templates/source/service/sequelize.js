const Sequelize = require('sequelize');
const config = require('../config').get('database');

module.exports = new Sequelize(config);
