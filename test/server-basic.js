const fs = require('fs');
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const {runTests} = require('./helpers/generator');

describe('magic:server - basic', () => {
  it('generates a naked project', () => {
    return helpers
      .run(path.join(__dirname, '../generators/server'))
      .withOptions({skipInstall: false})
      .withPrompts({
        name: 'testBasic',
        port: 3412,
        database: false,
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
        ]);
        return runTests(path.join(dir, 'test-basic'));
      });
  }).timeout(240000);
});
