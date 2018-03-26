const {exec} = require('child_process');

const runTests = (cwd) => new Promise((resolve, reject) => {
  exec('npm test', {cwd}, (err, stdout, stderr) => {
    if (err) return reject(err);
    return resolve(stdout);
  })
});

module.exports = {
  runTests,
};
