var hyperquest = require('hyperquest');
var moment = require('moment');
var split2 = require('split2');
var overrustleLogsUrl = require('overrustle-logs-url');

function overrustle(opts) {
  function parse(row) {
    // [2015-10-01 14:14:47 UTC] user: message
    return {
      timestamp: moment.utc(row.substring(1, 20)).toISOString(),
      user: row.substring(26, row.indexOf(': ')),
      message: row.substring(row.indexOf(': ') + 2)
    };
  }

  var url = overrustleLogsUrl(opts);

  return hyperquest(url).pipe(split2(parse));
}

module.exports = overrustle;
