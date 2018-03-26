const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(compression());
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use(require('./controller'));

<% if (forest) { %>
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('./middleware/forest-admin'));
<% } %>
app.use(require('./middleware/error-handler'));

module.exports = app;
