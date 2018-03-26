const server = require('./server');
const config = require('./config');
<% if (worker) { %>
const worker = require('./worker');
const rabbit = require('./service/rabbit');

rabbit.preparePublisher()
  .then(worker.listen)
  .then(() => {
    server.listen(config.get('PORT'), (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log('listen on port', config.get('PORT'));
    });
  })
<% } else { %> 
server.listen(config.get('PORT'), (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('listen on port', config.get('PORT'));
});
<% } %>
