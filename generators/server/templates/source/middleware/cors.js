const cors = require('cors');
const config = require('../config').get('cors');

const getOrigin = () => {
  if (process.env.NODE_ENV !== 'production') return '*';
  return [
    config.client,
    'https://app.forestadmin.com',
  ];
};

module.exports = cors({
  headers: ['Authorization', 'X-Requested-With', 'Content-Type'],
  origin: getOrigin(),
});
