let React = require('react')
let ReactDOM = require('react-dom')
let TestUtils = require('react-dom/test-utils')
let expect = require('expect')
let $ = require('jquery')

let {PostWrite} = require('PostWrite')

describe('PostWrite', () => {
  it('should exist', () => {
    expect(PostWrite).toExist()
  })

})