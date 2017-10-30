let React = require('react')
let ReactDOM = require('react-dom')
let TestUtils = require('react-dom/test-utils')
let expect = require('expect')
let $ = require('jquery')

let {CommentList} = require('CommentList')

describe('CommentList', () => {
  it('should exist', () => {
    expect(CommentList).toExist()
  })

})