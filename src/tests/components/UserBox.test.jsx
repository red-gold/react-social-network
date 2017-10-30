let React = require('react')
let ReactDOM = require('react-dom')
let TestUtils = require('react-dom/test-utils')
let expect = require('expect')
let $ = require('jquery')

let {UserBox} = require('UserBox')

describe('UserBox', () => {
  it('should exist', () => {
    expect(UserBox).toExist()
  })

})