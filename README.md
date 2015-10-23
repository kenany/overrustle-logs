# overrustle-logs

[![Build Status][travis-svg]][travis]
[![Dependency Status][gemnasium-svg]][gemnasium]

Streaming download of OverRustle logs.

## Example

In this example, we get a stream of all `destiny.gg` messages from a given date,
"stringify" the parsed objects with [`ndjson`][ndjson], and finally pipe to stdout:

   [ndjson]: https://github.com/maxogden/ndjson

``` javascript
var logs = require('overrustle-logs');
var ndjson = require('ndjson');

logs({
  channel: 'Destinygg',
  date: '2015-10-21'
}).pipe(ndjson.serialize()).pipe(process.stdout);
```

We can also get messages from a specific user. In this example, we will use the
`'data'` event just for the sake of showing how there are many ways to consume
streams in general:

``` javascript
var logs = require('overrustle-logs');

logs({
  channel: 'Destinygg',
  date: '2015-10-21',
  user: 'sztanpet'
}).on('data', function(data) {
  console.log(JSON.stringify(data));
});
```

## Installation

``` bash
$ npm install overrustle-logs
```

## API

``` javascript
var logs = require('overrustle-logs');
```

### `logs(opts)`

Returns a _Readable_ stream of _Objects_ that each represent a message. `opts`
is an _Object_ whose properties should be:

  - `opts.channel`: _String_ name of channel to download logs of. This is
  non-optional.
  - `opts.date`: _String_ date. If you are getting the entire logs of a channel,
  you must provide the year, month, and day. If you are getting the logs for a
  specific user, you only need to provide year and month. The format should be
  [parseable by `moment`](http://momentjs.com/docs/#/parsing/string/) (just use
  the ISO-8601 standard). This is non-optional.
  - `opts.user`: _String_ username of user you want to download logs of.
  This is optional.

Here is an example of an _Object_ that the stream with emit:

``` javascript
{
  timestamp: '2015-10-21T23:59:59.000Z',
  user: 'RustleBot',
  message: 'YEE'
}
```

   [travis]: https://travis-ci.org/KenanY/overrustle-logs
   [travis-svg]: https://img.shields.io/travis/KenanY/overrustle-logs.svg
   [gemnasium]: https://gemnasium.com/KenanY/overrustle-logs
   [gemnasium-svg]: https://img.shields.io/gemnasium/KenanY/overrustle-logs.svg
