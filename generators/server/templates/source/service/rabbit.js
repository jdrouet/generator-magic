const amqplib = require('amqplib');
const debug = require('debug')('app:service:rabbit');
const config = require('../config').get('rabbit');

const client = amqplib.connect(config.url);

const publisher = client.then((con) => con.createChannel());
const listener = client.then((con) => con.createChannel());

const readMessage = (msg) => {
  debug('read message', msg.content);
  msg.content = JSON.parse(msg.content.toString());
  return msg;
};

const writeMessage = (content) =>
  new Buffer(JSON.stringify(content));

const preparePublisher = () => publisher
  .then(async (ch) => {
    debug('prepare publisher');
    await ch.assertExchange('account', 'topic');
    await ch.assertExchange('invitation', 'topic');
    await ch.assertExchange('profile', 'topic');
    await ch.assertExchange('rating', 'topic');
    return ch;
  });

const prepareListener = () => listener
  .then(async (ch) => {
    debug('prepare listener');
    // put here your rabbit config
    // await ch.assertExchange('account', 'topic');
    // await ch.assertQueue('account-create-welcome-email');
    // await ch.bindQueue('account-create-welcome-email', 'account', 'create');
    //
    return ch;
  });

const publish = (exchange, key, content, options) => publisher
  .then(async (ch) => {
    debug('publish', {exchange, key});
    ch.publish(exchange, key, writeMessage(content), options);
  });

const listen = (queue, callback) => listener
  .then(async (ch) => {
    debug('listen', queue);
    ch.consume(queue, (msg) => {
      callback(ch, readMessage(msg))
        .catch((err) => debug(JSON.stringify(err, null, 2)));
    });
  });

module.exports = {
  client,
  publisher,
  listener,
  preparePublisher,
  prepareListener,
  publish,
  listen,
};
