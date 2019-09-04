var ndjson = require('ndjson');

var logs = require('../');

logs({
  channel: 'Destinygg',
  date: '2015-10-21'
}).pipe(ndjson.serialize()).pipe(process.stdout);
