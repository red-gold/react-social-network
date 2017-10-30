let React = require('react')
let ReactDOM = require('react-dom')
let TestUtils = require('react-dom/test-utils')
let expect = require('expect')
let $ = require('jquery')

let {Comment} = require('Comment')

describe('Comment', () => {
  it('should exist', () => {
    expect(Comment).toExist()
  })

})