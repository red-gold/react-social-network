// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Map} from 'immutable'

import List from 'material-ui/List'

// - Import app components
import CircleComponent from 'components/circle'
import { IYourCirclesComponentProps } from './IYourCirclesComponentProps'
import { IYourCirclesComponentState } from './IYourCirclesComponentState'
import { Circle } from 'core/domain/circles'

// - Import API

// - Import actions

/**
 * Create component class
 */
export class YourCirclesComponent extends Component<IYourCirclesComponentProps,IYourCirclesComponentState> {

  static propTypes = {

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IYourCirclesComponentProps) {
    super(props)

    // Defaul state
    this.state = {

    }

    // Binding functions to `this`

  }

  circleList = () => {
    let { circles,uid } = this.props
    let parsedCircles: any[] = []

    if (circles) {
      circles.map((circle, key) => {
        parsedCircles.push(<CircleComponent key={key} circle={circle!} id={key!} uid={uid!} />)
      })
    }
    return parsedCircles
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {
    let circleItems = this.circleList()
    return (

      <div style={{
        maxWidth: '800px',
        margin: '40px auto'
      }}>
      {(circleItems && circleItems.length !== 0 ) ? (<div>
        <div className='profile__title'>
          Your circles
                        </div>
        <List>
        {circleItems}
        </List>
        <div style={{ height: '24px' }}></div>
        </div>) : ''}
      </div>

    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: Function, ownProps: IYourCirclesComponentProps) => {
  return {
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IYourCirclesComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'])
  const circles: Map<string, Map<string, any>> = state.getIn(['circle', 'circleList'], {})
  return {
    uid,
    circles

  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(YourCirclesComponent as any)
