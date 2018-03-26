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
          'source/index.js',
          'source/server.js',
          'source/config.js',
          'source/controller/index.js',
          'source/controller/status.js',
          'source/model/index.js',
          'source/model/account.js',
          'test/helper/index.js',
          'test/ctrl__status.js',
          'test/global.js',
        ]);
        return runTests(path.join(dir, 'test-with-database'));
      });
  }).timeout(240000);
});
