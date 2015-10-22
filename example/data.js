var logs = require('../');

logs({
  channel: 'Destinygg',
  date: '2015-10-21',
  user: 'sztanpet'
}).on('data', function(data) {
  console.log(JSON.stringify(data));
});
