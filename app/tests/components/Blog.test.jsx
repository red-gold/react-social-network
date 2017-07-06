var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var {Blog} = require('Blog');

describe('Blog', () => {
  it('should exist', () => {
    expect(Blog).toExist();
  })

})