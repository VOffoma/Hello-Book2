const path = require('path');
require('babel-register');

require('babel-polyfill');

const server = path.join(__dirname, './server/src/server.js');
require(server);
