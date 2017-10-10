let React = require('react')
let ReactDOM = require('react-dom')
let TestUtils = require('react-dom/test-utils')
let expect = require('expect')
let $ = require('jquery')

let {Home} = require('Home')

describe('Home', () => {
  it('should exist', () => {
    expect(Home).toExist()
  })

})