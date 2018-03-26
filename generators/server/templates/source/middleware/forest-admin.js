const forest = require('forest-express-sequelize');
const config = require('../config').get('forest');

module.exports = forest.init({
  modelsDir: __dirname + '/../model',
  envSecret: config.env_secret,
  authSecret: config.auth_secret,
  sequelize: require('../service/sequelize'),
});
