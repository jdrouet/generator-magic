const faker = require('faker');
const models = require('../../source/model');

const create = (name, body = {}) => () =>
  models.Account.create(Object.assign({
    email: faker.internet.email(),
  }, body))
  .then((account) => global.store.set(name, account));

module.exports = {
  create,
};
