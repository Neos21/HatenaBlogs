const fs = require('fs');

fs.mkdirSync('./dist/styles', { recursive: true });
fs.mkdirSync('./dist/scripts', { recursive: true });

fs.copyFileSync('./src/scripts/murga.js', './dist/scripts/murga.js');
