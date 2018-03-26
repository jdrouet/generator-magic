const helper = require('./helper');

<% if (database) { %>
beforeEach(helper.database.reset);
<% } %>
beforeEach(() => global.store = new Map());

<% if (database) { %>
after(helper.database.close);
<% } %>
