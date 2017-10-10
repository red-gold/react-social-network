let React = require('react')
let ReactDOM = require('react-dom')
let TestUtils = require('react-dom/test-utils')
let expect = require('expect')
let $ = require('jquery')

let {Followers} = require('Followers')

describe('Followers', () => {
  it('should exist', () => {
    expect(Followers).toExist()
  })

})