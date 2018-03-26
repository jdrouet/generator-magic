const path = require('path');
const Sequelize = require('sequelize');
const Umzug = require('umzug');
const sequelize = require('../../source/service/sequelize');

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {sequelize},
  migrations: {
    params: [
      sequelize.getQueryInterface(),
      Sequelize,
    ],
    path: path.join(__dirname, '../../migrations'),
  },
})

const migrate = () => umzug.up()
  .then(() => null);

const rollback = () => umzug
  .down({ to: 0 })
  .then(() => null);

const reset = () => rollback().then(migrate);

const close = () => sequelize.close();

module.exports = {reset, close};
