# react-next-experss-boilerplate

The package is intended to install react, next js easier with some start files to help developer avoid the routine.

Firstly, install the package:
```
npm i --save r-n-e-b
```

Then create `test.js` with followed contents:

```
const rneb = require('r-n-e-b');

rneb.create(__dirname)
	.then(result => {
		console.log(result);
		process.exit(0);
	});
```

Or via command line:
```
node node_modules/r-n-e-b/index
```

Then run from your project's directory to install new dependencies:
```
npm install
```

It has to be run because of `r-n-e-b` modifies your package.json dependencies with those that are presented in files which are copied to your project.