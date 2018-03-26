const fs = require('fs');
const path = require('path');
const sequelize = require('../service/sequelize');

const db = fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .reduce((res, file) => {
    const model = sequelize.import(path.join(__dirname, file));
    return Object.assign({[model.name]: model}, res);
  }, {});

Object.values(db).forEach((model) => {
  if ('associate' in model) {
    model.associate(db);
  }
});

Object.values(db).forEach((model) => {
  if ('scopes' in model) {
    model.scopes();
  }
});

Object.values(db).forEach((model) => {
  model.db = db;
});

module.exports = db;
