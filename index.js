const path = require('path');
const util = require('util');
const fs = require('fs');

const ncp = util.promisify( require('ncp').ncp );

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const ignoreCopy = [ '.next', 'node_modules', 'package.json' ];
const sourceFolder = path.join(__dirname, 'src');

async function addModulesToOriginalPackageFile() {
    const pathname = path.join( sourceFolder, 'package.json' );
    const contents = await readFile(pathname);
    const structure = JSON.parse(contents);
    const pathnameOrig = path.join( __dirname, '../../package.json' );
    const contentsOrig = await readFile(pathnameOrig);
    const structureOrig = JSON.parse(contentsOrig);

    structureOrig.dependencies = {
        ...structureOrig.dependencies,
        ...structure.dependencies
    };

    return writeFile(pathnameOrig, JSON.stringify(structureOrig, null, '  '));
}

function filter(pathname) {
    const filename = pathname
        .replace(sourceFolder, '')
        .replace(/^\//, '');

    console.log('filter', filename, !ignoreCopy.includes(filename));

    return !ignoreCopy.includes(filename);
}

async function create(dirname = '../..') {
    console.log('copying from', sourceFolder, 'to', dirname);

    return ncp(sourceFolder, dirname, {
        filter
    })
        .then(addModulesToOriginalPackageFile);
}

if (!module.parent) {
    const myPath = process.argv[2] ? 
        process.argv[2]:
        '../..';
    const pathname = path.join( __dirname, myPath);
    
    console.log('loading...');

    create( pathname )
        .then(() => 
            console.log('success')    
        )
        .catch(err => 
            console.log('error:', err)    
        );
} else {
    module.exports = create;
}