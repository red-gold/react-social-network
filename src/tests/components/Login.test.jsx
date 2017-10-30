let React = require('react')
let ReactDOM = require('react-dom')
let TestUtils = require('react-dom/test-utils')
let expect = require('expect')
let $ = require('jquery')

let {Login} = require('Login')

describe('Login', () => {
  it('should exist', () => {
    expect(Login).toExist()
  })

})