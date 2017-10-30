let React = require('react')
let ReactDOM = require('react-dom')
let TestUtils = require('react-dom/test-utils')
let expect = require('expect')
let $ = require('jquery')

let {Signup} = require('Signup')

describe('Signup', () => {
  it('should exist', () => {
    expect(Signup).toExist()
  })

})