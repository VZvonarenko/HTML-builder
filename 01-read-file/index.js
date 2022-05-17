const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, 'text.txt');

const stream = fs.createReadStream(file, 'utf-8');
let data = '';
stream.on('data', chunk => data+=chunk);
stream.on('end', () => console.log(data));
stream.on('error', error => console.log('Error', error.message));
