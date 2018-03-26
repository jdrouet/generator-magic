const config = require('./source/config').get('database');

module.exports = {
  development: config,
  test: config,
  production: config,
};
