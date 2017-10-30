let React = require('react')
let ReactDOM = require('react-dom')
let TestUtils = require('react-dom/test-utils')
let expect = require('expect')
let $ = require('jquery')

let {UserBoxList} = require('UserBoxList')

describe('UserBoxList', () => {
  it('should exist', () => {
    expect(UserBoxList).toExist()
  })

})