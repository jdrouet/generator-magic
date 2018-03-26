const client = require('@sendgrid/client');
const config = require('../config').get('sendgrid');

client.setApiKey(config.key);

const convertParams = (params) => Object
  .keys(params)
  .reduce((res, oldKey) => Object
    .assign(res, {[`<%${oldKey}%>`]: params[oldKey]}), {});

const sendEmailTemplate = (template, recipient, params) => {
  const substitutions = convertParams(params);
  return client.request({
    body: {
      from: config.from,
      personalizations: [
        {
          to: [{email: recipient}],
          substitutions,
        },
      ],
      template_id: config.templates[template],
    },
    method: 'POST',
    url: '/v3/mail/send',
  })
  .then(console.log);
};

module.exports = {
  sendEmailTemplate,
};
