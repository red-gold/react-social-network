let React = require('react')
let ReactDOM = require('react-dom')
let TestUtils = require('react-dom/test-utils')
let expect = require('expect')
let $ = require('jquery')

let {HomeHeader} = require('HomeHeader')

describe('HomeHeader', () => {
  it('should exist', () => {
    expect(HomeHeader).toExist()
  })

})