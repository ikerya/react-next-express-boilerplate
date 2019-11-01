const nconf = require('nconf');
const path = require('path');

nconf.argv()
	.env()
	.file({ file: path.join(__dirname, './index.json') });

nconf.set('production', process.env.NODE_ENV === 'production');

module.exports = nconf;