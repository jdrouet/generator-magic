const fs = require('fs');
const {Router} = require('express');
const jwt = require('express-jwt');
const config = require('../../config').get('forest');

const router = new Router();

router.use(jwt({
  secret: config.auth_secret,
  credentialsRequired: false,
}));

fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    router.use(require(`./${file}`));
  });

module.exports = router;
