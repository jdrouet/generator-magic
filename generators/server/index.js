const Generator = require('yeoman-generator');
const path = require('path');
const lodash = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.__dependencies = [];
    this.__devDependencies = [];
    this.option('name', {
      type: String,
      required: false,
    });
    this.option('port', {
      type: Number,
      required: false,
    });
    this.option('database', {
      type: Boolean,
      required: false,
    });
    this.option('sendgrid', {
      type: Boolean,
      required: false,
    });
    this.option('forest', {
      type: Boolean,
      required: false,
    });
  }

  __prompting_general() {
    const prompts = [];
    if (!this.options.name) {
      prompts.push({
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname,
      });
    }
    if (!this.options.port) {
      prompts.push({
        type: 'input',
        name: 'port',
        message: 'What port should we use',
        default: 3000,
      });
    }
    if (this.options.database === undefined) {
      prompts.push({
        type: 'confirm',
        name: 'database',
        message: 'Do you need a database',
        default: true,
      });
    }
    if (this.options.sendgrid === undefined) {
      prompts.push({
        type: 'confirm',
        name: 'sendgrid',
        message: 'Do you need a sendgrid',
        default: true,
      });
    }
    if (this.options.forest === undefined) {
      prompts.push({
        type: 'confirm',
        name: 'forest',
        message: 'Do you need a forest',
        default: true,
      });
    }
    return this.prompt(prompts).then((result) => {
      this.props = Object.assign(this.options, result, {
        path: lodash.kebabCase(result.name),
      });
    });
  }

  prompting() {
    this.log('prompting');
    return this.__prompting_general();
  }

  resolve() {
    this.log('resolve');
    this.__dependencies.push(
      'boom',
      'compression',
      'cors',
      'body-parser',
      'express',
      'express-jwt',
      'joi',
      'jsonwebtoken',
      'morgan',
      'nconf',
    );
    this.__devDependencies.push(
      'chai',
      'faker',
      'mocha',
      'nodemon',
      'sinon',
      'supertest',
    );
    if (this.props.database) {
      this.__dependencies.push(
        'sequelize',
        'sequelize-cli',
        'pg',
      );
    }
    if (this.props.worker) {
      this.__dependencies.push(
        'amqplib',
      );
    }
    if (this.props.sendgrid) {
      this.__dependencies.push(
        '@sendgrid/client',
      );
    }
    if (this.props.forest) {
      this.__dependencies.push(
        'forest-express-sequelize',
      );
    }
    if (this.props.apidoc) {
      this.__dependencies.push(
        'apidoc',
      );
    }
  }

  __writing_base() {
    this.log('writing base');
    return Promise.all([
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
    ].map((item) => this.fs.copyTpl(
      this.templatePath(item),
      this.destinationPath(item),
      this.props,
    )));
  }

  __writing_database() {
    if (!this.props.database) return;
    this.log('writing database');
    [
      '.sequelizerc',
      'database.js',
      'migrations/20180302211939-create-account.js',
      'source/model/index.js',
      'source/model/account.js',
      'source/service/sequelize.js',
      'test/helper/account.js',
      'test/helper/database.js',
    ].map((item) => this.fs.copyTpl(
      this.templatePath(item),
      this.destinationPath(item),
      this.props,
    ));
  }

  __writing_sendgrid() {
    if (!this.props.sendgrid) return;
    this.log('writing sendgrid');
    [
      'source/service/sendgrid.js',
    ].map((item) => this.fs.copyTpl(
      this.templatePath(item),
      this.destinationPath(item),
      this.props,
    ));
  }

  __writing_apidoc() {
    if (!this.props.apidoc) return;
    this.log('writing apidoc');
  }

  __writing_forest() {
    if (!this.props.forest) return;
    this.log('writing forest');
    [
      'forest/account.js',
      'source/controller/forest/index.js',
      'source/controller/forest/account.js',
    ].map((item) => this.fs.copyTpl(
      this.templatePath(item),
      this.destinationPath(item),
      this.props,
    ));
  }

  writing() {
    this.destinationRoot(path.join(this.destinationRoot(), this.props.path));
    this.__writing_base();
    this.__writing_database();
    this.__writing_forest();
    this.__writing_apidoc();
  }

  install() {
    this.log('install dependencies');
    this.yarnInstall(this.__dependencies);
    this.yarnInstall(this.__devDependencies, {dev: true});
  }

  end() {
    console.log('Before doing anything...');
    if (this.props.database) {
      console.log('You need to create a database');
      console.log('docker exec -i -t postgres createdb -h localhost -U postgres --owner root', this.props.path);
    }
    console.log('...that\'s it');
    console.log('Bye bye!');
  }
}
