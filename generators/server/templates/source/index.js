const server = require('./server');
const config = require('./config');

server.listen(config.get('PORT'), (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('listen on port', config.get('PORT'));
});
