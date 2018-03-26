const jwt = require('express-jwt');
const config = require('../config').get('jwt');

const optional = jwt({
  secret: config.secret,
  credentialsRequired: false,
  requestProperty: 'account',
  getToken: (req) => req.headers.authorization,
});

const required = jwt({
  secret: config.secret,
  credentialsRequired: true,
  requestProperty: 'account',
  getToken: (req) => req.headers.authorization,
});

module.exports = {
  optional,
  required,
};
