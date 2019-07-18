var logs = require('../');
var test = require('tape');
var isFunction = require('lodash.isfunction');
var isReadable = require('isstream').isReadable;
var isPlainObject = require('is-plain-object');
var keys = Object.keys || require('object-keys');
var isString = require('is-string');
var moment = require('moment');

test('exports a function', function(t) {
  t.plan(1);
  t.ok(isFunction(logs));
});

test('returns a readable stream', function(t) {
  t.plan(1);
  t.ok(isReadable(logs({ channel: 'Destinygg', date: '2015-10-21' })));
});

test('emits objects', function(t) {
  logs({ channel: 'Destinygg', date: '2015-10-21' })
    .on('error', function(error) {
      t.error(error);
    })
    .on('data', function(data) {
      t.ok(isPlainObject(data)
        && keys(data).length === 3
        && isString(data.timestamp)
        && isString(data.user)
        && isString(data.message))
        && moment(data.timestamp).isSame('2015-10-21', 'year')
        && moment(data.timestamp).isSame('2015-10-21', 'month')
        && moment(data.timestamp).isSame('2015-10-21', 'day');
    })
    .on('end', function() {
      t.end();
    });
});

test('works with lowercase channel', function(t) {
  logs({ channel: 'destinygg', date: '2015-10-21' })
    .on('error', function(error) {
      t.error(error);
    })
    .on('data', function(data) {
      t.ok(isPlainObject(data)
        && keys(data).length === 3
        && isString(data.timestamp)
        && isString(data.user)
        && isString(data.message))
        && moment(data.timestamp).isSame('2015-10-21', 'year')
        && moment(data.timestamp).isSame('2015-10-21', 'month')
        && moment(data.timestamp).isSame('2015-10-21', 'day');
    })
    .on('end', function() {
      t.end();
    });
});

test('specific user', function(t) {
  logs({ channel: 'destinygg', date: '2015-10-21', user: 'sztanpet' })
    .on('error', function(error) {
      t.error(error);
    })
    .on('data', function(data) {
      t.ok(isPlainObject(data)
        && keys(data).length === 3
        && isString(data.timestamp)
        && isString(data.user)
        && isString(data.message))
        && moment(data.timestamp).isSame('2015-10-21', 'year')
        && moment(data.timestamp).isSame('2015-10-21', 'month')
        && moment(data.timestamp).isSame('2015-10-21', 'day');
    })
    .on('end', function() {
      t.end();
    });
});
