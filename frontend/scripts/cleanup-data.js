const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'deepDiveData.js');
let data = fs.readFileSync(filePath, 'utf8');

const before = data.length;

// Replace em dashes and en dashes with regular dashes
data = data.replace(/\u2014/g, '-');
data = data.replace(/\u2013/g, '-');

// Replace smart quotes with regular quotes
data = data.replace(/\u2018/g, "'");
data = data.replace(/\u2019/g, "'");
data = data.replace(/\u201C/g, '"');
data = data.replace(/\u201D/g, '"');

// Remove emoji characters used as icons in data text
data = data.replace(/✅\s*/g, '');
data = data.replace(/❌\s*/g, '');
data = data.replace(/📍\s*/g, '');
data = data.replace(/💡\s*/g, '');
data = data.replace(/⚠️\s*/g, '');
data = data.replace(/🐛\s*/g, '');
data = data.replace(/⌨️\s*/g, '');
data = data.replace(/☐\s*/g, '');
data = data.replace(/📋\s*/g, '');
data = data.replace(/⚡\s*/g, '');
data = data.replace(/🔬\s*/g, '');

fs.writeFileSync(filePath, data, 'utf8');
console.log('Done. Before:', before, 'After:', data.length, 'Diff:', before - data.length, 'chars removed');
