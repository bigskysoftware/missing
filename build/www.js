var config = require('../package.json');
var fs = require('fs-extra');

console.log(config.version)

fs.copySync("dist/missing.css", "www/missing.css");
