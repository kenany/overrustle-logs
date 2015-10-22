var logs = require('../');
var test = require('tape');
var isFunction = require('lodash.isfunction');
var isReadable = require('isstream').isReadable;
var isPlainObject = require('is-plain-object');
var keys = Object.keys || require('object-keys');
var isString = require('is-string');

test('exports a function', function(t) {
  t.plan(1);
  t.ok(isFunction(logs));
});

test('returns a readable stream', function(t) {
  t.plan(1);
  t.ok(isReadable(logs({channel: 'Destinygg', date: '2015-10-21'})));
});

test('emits objects', function(t) {
  logs({channel: 'Destinygg', date: '2015-10-21'})
    .on('error', function(error) {
      t.error(error);
    })
    .on('data', function(data) {
      t.ok(isPlainObject(data));
      t.ok(keys(data).length, 3);
      t.ok(isString(data.timestamp));
      t.ok(isString(data.user));
      t.ok(isString(data.message));
    })
    .on('end', function() {
      t.end();
    });
});

test('works with lowercase channel', function(t) {
  logs({channel: 'destinygg', date: '2015-10-21'})
    .on('error', function(error) {
      t.error(error);
    })
    .on('data', function(data) {
      t.ok(isPlainObject(data));
      t.ok(keys(data).length, 3);
      t.ok(isString(data.timestamp));
      t.ok(isString(data.user));
      t.ok(isString(data.message));
    })
    .on('end', function() {
      t.end();
    });
});

test('specific user', function(t) {
  logs({channel: 'destinygg', date: '2015-10-21', user: 'sztanpet'})
    .on('error', function(error) {
      t.error(error);
    })
    .on('data', function(data) {
      t.ok(isPlainObject(data));
      t.ok(keys(data).length, 3);
      t.ok(isString(data.timestamp));
      t.ok(isString(data.user));
      t.ok(isString(data.message));
    })
    .on('end', function() {
      t.end();
    });
});
