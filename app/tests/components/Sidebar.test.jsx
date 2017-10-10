let React = require('react')
let ReactDOM = require('react-dom')
let TestUtils = require('react-dom/test-utils')
let expect = require('expect')
let $ = require('jquery')

let {Sidebar} = require('Sidebar')

describe('Sidebar', () => {
  it('should exist', () => {
    expect(Sidebar).toExist()
  })

})