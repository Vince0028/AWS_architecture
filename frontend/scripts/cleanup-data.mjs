import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, '..', 'src', 'data', 'deepDiveData.js');
let data = readFileSync(filePath, 'utf8');

const before = data.length;

// Replace em dashes and en dashes with regular dashes
data = data.replace(/\u2014/g, '-');
data = data.replace(/\u2013/g, '-');

// Replace smart quotes
data = data.replace(/\u2018/g, "'");
data = data.replace(/\u2019/g, "'");
data = data.replace(/\u201C/g, '"');
data = data.replace(/\u201D/g, '"');

// Remove emoji characters from data text
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

writeFileSync(filePath, data, 'utf8');
console.log('Done. Before:', before, 'After:', data.length, 'Removed:', before - data.length, 'chars');
