const debug = require('debug');

module.exports = require('nconf')
  .env('__')
  .defaults({
    PORT: <%= port %>,
    <% if (database) { %>
    database: {
      host: 'localhost',
      port: 5433,
      database: '<%= path %>',
      username: 'root',
      dialect: 'postgres',
      logging: debug('app:service:database'),
      dialectOptions: {
        ssl: process.env.NODE_ENV === 'production',
      },
    },
    <% } %>
    jwt: {
      secret: 'wfintsa90niornth',
    },
    <% if (forest) { %>
    forest: {
      auth_secret: 'fake_auth_secret',
      env_secret: 'fake_env_secret',
    },
    <% } %>
    <% if (sendgrid) { %>
    sendgrid: {
      from: {
        name: 'CHANGE ME',
        email: 'contact@change.mw',
      },
      key: 'a fake key',
      templates: {
        login: 'change-me',
      },
    },
    <% } %>
  });
