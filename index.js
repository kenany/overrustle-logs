var capitalize = require('capitalize');
var hyperquest = require('hyperquest');
var moment = require('moment');
var split2 = require('split2');
var join = require('url-join');

// HTTPS actually supported
var domain = 'https://overrustlelogs.net';

function overrustle(opts) {
  // begin with channel directory (first letter is capitalized)
  var url = join(domain,
    encodeURIComponent(capitalize(opts.channel) + ' chatlog'));

  var date = moment.utc(opts.date);

  // then go to a specific year-month
  url = join(url,
    encodeURIComponent(date.format('MMMM') + ' ' + date.format('YYYY')));

  // get logs of specific user if desired
  if (opts.user) {
    url = join(url, 'userlogs', opts.user + '.txt');
  }

  // otherwise get logs of date
  else {
    url = join(url, date.format('YYYY-MM-DD') + '.txt');
  }

  function parse(row) {
    // [2015-10-01 14:14:47 UTC] user: message
    return {
      timestamp: moment.utc(row.substring(1, 20)).toISOString(),
      user: row.substring(26, row.indexOf(': ')),
      message: row.substring(row.indexOf(': ') + 2)
    };
  }

  return hyperquest(url).pipe(split2(parse));
}

module.exports = overrustle;
