var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-dom/test-utils');
var expect = require('expect');
var $ = require('jquery');

var {Post} = require('Post');

describe('Post', () => {
  it('should exist', () => {
    expect(Post).toExist();
  })

})