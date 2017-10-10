let React = require('react')
let ReactDOM = require('react-dom')
let TestUtils = require('react-dom/test-utils')
let expect = require('expect')
let $ = require('jquery')

let {CommentWrite} = require('CommentWrite')

describe('CommentWrite', () => {
  it('should exist', () => {
    expect(CommentWrite).toExist()
  })

})