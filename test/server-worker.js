const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const {runTests} = require('./helpers/generator');

describe('magic:server - worker', () => {
  it('generates a project', () => {
    return helpers
      .run(path.join(__dirname, '../generators/server'))
      .withOptions({skipInstall: false})
      .withPrompts({
        name: 'testWithWorker',
        port: 3412,
        database: false,
        sendgrid: false,
        forest: false,
        worker: true,
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
          'source/worker/index.js',
          'source/service/rabbit.js',
        ]);
        return runTests(path.join(dir, 'test-with-worker'));
      });
  }).timeout(240000);
});
