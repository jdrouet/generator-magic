const fs = require('fs');
const path = require('path');
const rabbit = require('../service/rabbit');

const workers = fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js') && file.endsWith('.js'))
  .map((file) => file.substr(0, file.length - 3));

const listen = () => rabbit
  .prepareListener()
  .then(() => {
    workers.forEach((name) => {
      rabbit.listen(name, require(`./${name}`));
    });
  });

module.exports = {
  listen,
};
