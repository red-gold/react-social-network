// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Tabs, Tab } from 'material-ui/Tabs'
import { grey50, grey200, grey400, grey600, cyan500 } from 'material-ui/styles/colors'
import { push } from 'react-router-redux'

// - Import app components
import FindPeople from 'components/findPeople'
import Following from 'components/following'
import Followers from 'components/followers'
import YourCircles from 'components/yourCircles'

// - Import API

// - Import actions
import * as circleActions from 'actions/circleActions'
import * as globalActions from 'actions/globalActions'
import { IPeopleComponentProps } from './IPeopleComponentProps'
import { IPeopleComponentState } from './IPeopleComponentState'

/**
 * Create component class
 */
export class PeopleComponent extends Component<IPeopleComponentProps,IPeopleComponentState> {

  static propTypes = {

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IPeopleComponentProps) {
    super(props)

    // Defaul state
    this.state = {

    }

    // Binding functions to `this`

  }

  componentWillMount () {
    const { setHeaderTitle} = this.props
    const {tab} = this.props.match.params
    switch (tab) {
      case undefined:
      case '':
        setHeaderTitle!('People')
        break
      case 'circles':
        setHeaderTitle!('Circles')
        break
      case 'followers':
        setHeaderTitle!('Followers')
        break
      default:
        break
    }

  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {
  /**
   * Component styles
   */
    const styles = {
      people: {
        margin: '0 auto',
        width: '90%'
      },
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
      },
      slide: {
        padding: 10
      }
    }

    const {circlesLoaded, goTo, setHeaderTitle} = this.props
    const {tab} = this.props.match.params
    let tabIndex = 0
    switch (tab) {
      case undefined:
      case '':
        tabIndex = 0
        break
      case 'circles':
        tabIndex = 1
        break
      case 'followers':
        tabIndex = 2
        break
      default:
        break
    }
    return (
      <div style={styles.people}>
      <Tabs inkBarStyle={{backgroundColor: grey50}} initialSelectedIndex={tabIndex} >
        <Tab label='Find People' onActive={() => {
          goTo!('/people')
          setHeaderTitle!('People')
        }} >
          {circlesLoaded ? <FindPeople /> : ''}
        </Tab>
        <Tab label='Following' onActive={() => {
          goTo!('/people/circles')
          setHeaderTitle!('Circles')
        }} >
         {circlesLoaded ? <Following/> : ''}
         {circlesLoaded ? <YourCircles/> : ''}
        </Tab>
        <Tab label='Followers' onActive={() => {
          goTo!('/people/followers')
          setHeaderTitle!('Followers')
        }}>
        {circlesLoaded ? <Followers /> : ''}
        </Tab>
      </Tabs>
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
const mapDispatchToProps = (dispatch: any, ownProps: IPeopleComponentProps) => {

  return {
    goTo: (url: string) => dispatch(push(url)),
    setHeaderTitle : (title: string) => dispatch(globalActions.setHeaderTitle(title))

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IPeopleComponentProps) => {

  return {
    uid: state.authorize.uid,
    circlesLoaded: state.circle.loaded

  }
}

// - Connect component to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PeopleComponent as any))
