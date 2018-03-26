const {Router} = require('express');
const jwt = require('../middleware/json-web-token');

const router = new Router();

<% if (forest) { %>
router.use('/forest', require('./forest'));
<% } %>

router.get('/api', require('./status'));

module.exports = router;
