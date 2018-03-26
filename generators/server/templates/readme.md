# <%= name %>

## Installation

<% if (database) { %>
docker run -d -p 5433:5432 --name postgres postgres
docker exec -i -t postgres createdb -h localhost -U postgres --owner root <%= path %>
<% } %>

