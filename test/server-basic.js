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
          'source/index.js',
          'source/server.js',
          'source/config.js',
          'source/controller/index.js',
          'source/controller/status.js',
          'test/ctrl__status.js',
        ]);
        return runTests(path.join(dir, 'test-basic'));
      });
  }).timeout(240000);
});
