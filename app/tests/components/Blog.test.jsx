let React = require('react')
let ReactDOM = require('react-dom')
let TestUtils = require('react-dom/test-utils')
let expect = require('expect')
let $ = require('jquery')

let {Blog} = require('Blog')

describe('Blog', () => {
  it('should exist', () => {
    expect(Blog).toExist()
  })

})