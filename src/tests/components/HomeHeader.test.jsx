var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-dom/test-utils');
var expect = require('expect');
var $ = require('jquery');

var {HomeHeader} = require('HomeHeader');

describe('HomeHeader', () => {
  it('should exist', () => {
    expect(HomeHeader).toExist();
  })

})