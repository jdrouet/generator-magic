module.exports = require('fs')
  .readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .reduce((res, file) => {
    const filename = file.substr(0, file.length - 3);
    return Object.assign(res, {
      [filename]: require(`./${file}`),
    });
  }, {});