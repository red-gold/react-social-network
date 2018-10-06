
import * as React from 'react'
import 'reflect-metadata'
import * as ReactDOM from 'react-dom'
import MasterComponent from './MasterComponent'
describe('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MasterComponent />, div)
})