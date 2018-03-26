const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const {runTests} = require('./helpers/generator');

describe('magic:server - database', () => {
  it('generates a project', () => {
    return helpers
      .run(path.join(__dirname, '../generators/server'))
      .withOptions({skipInstall: false})
      .withPrompts({
        name: 'testWithDatabase',
        port: 3412,
        database: true,
        sendgrid: false,
        forest: false,
      })
      .then((dir) => {
        assert.file([
          'readme.md',
          '.circleci/config.yml',
          'package.json',
          'source/index.js',
          'source/config.js',
          'source/server.js',
          'source/controller/index.js',
          'source/controller/status.js',
          'source/middleware/cors.js',
          'source/middleware/json-web-token.js',
          'source/middleware/error-handler.js',
          'test/helper/index.js',
          'test/ctrl__status.js',
          'test/global.js',
          '.sequelizerc',
          'database.js',
          'migrations/20180302211939-create-account.js',
          'source/model/index.js',
          'source/model/account.js',
          'source/service/sequelize.js',
          'test/helper/account.js',
          'test/helper/database.js',
        ]);
        return runTests(path.join(dir, 'test-with-database'));
      });
  }).timeout(240000);
});
