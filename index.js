const Client = require('./lib/client');

module.exports = function (options) {
  return new Client(options);
};
