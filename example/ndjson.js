var logs = require('../');
var ndjson = require('ndjson');

logs({
  channel: 'Destinygg',
  date: '2015-10-21'
}).pipe(ndjson.serialize()).pipe(process.stdout);
