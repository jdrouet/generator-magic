const liana = require('forest-express-sequelize');

liana.collection('Account', {
  actions: [
    { name: 'account-magic-link' },
  ],
  fields: [{
    field: 'coordinates',
    type: 'String',
    get: function (object) {
      if (!object.geometry) return null;
      const {coordinates} = object.geometry;
      return [
        coordinates[1],
        coordinates[0],
      ].join(',');
    }
  }]
});