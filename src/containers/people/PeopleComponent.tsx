// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { grey, cyan } from '@material-ui/core/colors'
import { push } from 'react-router-redux'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'

import {Map} from 'immutable'
import { translate, Trans } from 'react-i18next'

// - Import app components
import FindPeople from 'src/components/findPeople'
import Following from 'src/components/following'
import Followers from 'src/components/followers'
import YourCircles from 'src/components/yourCircles'

// - Import API

// - Import actions
import * as circleActions from 'src/store/actions/circleActions'
import * as globalActions from 'src/store/actions/globalActions'
import { IPeopleComponentProps } from './IPeopleComponentProps'
import { IPeopleComponentState } from './IPeopleComponentState'

const TabContainer = (props: any) => {
  return (
    <Typography component='div' style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

/**
 * Create component class
 */
export class PeopleComponent extends Component<IPeopleComponentProps,IPeopleComponentState> {

  static propTypes = {

  }

  /**
   * Component constructor
   *
   */
  constructor (props: IPeopleComponentProps) {
    super(props)
    const {tab} = this.props.match.params
    // Defaul state
    this.state = {
      tabIndex: this.getTabIndexByNav(tab)
    }

    // Binding functions to `this`

  }

  /**
   * Hadle on tab change
   */
  handleChangeTab = (event: any, value: any) => {
    const {circlesLoaded, goTo, setHeaderTitle, t} = this.props
    this.setState({ tabIndex: value })
    switch (value) {
      case 0:
        goTo!('/people')
        setHeaderTitle!(t!('header.peopleCaption'))
        break
      case 1:
        goTo!('/people/circles')
        setHeaderTitle!(t!('header.circlesCaption'))
        break
      case 2:
        goTo!('/people/followers')
        setHeaderTitle!(t!('header.followersCaption'))
        break

      default:
        break
    }
  }

  componentWillMount () {
    const { setHeaderTitle, t} = this.props
    const {tab} = this.props.match.params
    switch (tab) {
      case undefined:
      case '':
        setHeaderTitle!(t!('header.peopleCaption'))
        break
      case 'circles':
        setHeaderTitle!(t!('header.circlesCaption'))
        break
      case 'followers':
        setHeaderTitle!(t!('header.followersCaption'))
        break
      default:
        break
    }

  }

  /**
   * Reneder component DOM
   * 
   */
  render () {
  /**
   * Component styles
   */
    const styles = {
      people: {
        margin: '0 auto'
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

    const {circlesLoaded, goTo, setHeaderTitle, t} = this.props
    const {tabIndex} = this.state
    return (
      <div style={styles.people}>
      <AppBar position='static' color='default'>
      <Tabs indicatorColor={'secondary'}
      onChange={this.handleChangeTab}
      value={tabIndex} centered
      textColor='primary'
       >
        <Tab label={t!('people.findPeopleTab')} />
        <Tab label={t!('people.followingTab')} />
        <Tab label={t!('people.followersTab')} />
      </Tabs>
      </AppBar>
      {tabIndex === 0 && <TabContainer>{circlesLoaded ? <FindPeople /> : ''}</TabContainer>}
      {tabIndex === 1 && <TabContainer>
        {circlesLoaded ? <Following/> : ''}
        {circlesLoaded ? <YourCircles/> : ''}
      </TabContainer>}
      {tabIndex === 2 && <TabContainer>{circlesLoaded ? <Followers /> : ''}</TabContainer>}
      </div>
    )
  }

  /**
   * Get tab index by navigation name
   */
  private getTabIndexByNav: (navName: string) => number = (navName: string) => {
    let tabIndex = 0
    switch (navName) {
      case 'circles':
        return 1
      case 'followers':
        return 2
      default:
        return 0
    }
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IPeopleComponentProps) => {

  return {
    goTo: (url: string) => dispatch(push(url)),
    setHeaderTitle : (title: string) => dispatch(globalActions.setHeaderTitle(title))

  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IPeopleComponentProps) => {

  return {
    
    uid: state.getIn(['authorize', 'uid'], 0),
    circlesLoaded: state.getIn(['circle', 'loaded'])

  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(PeopleComponent as any)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translateWrraper as any) as any)
