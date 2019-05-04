// - Import react components
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { push } from 'connected-react-router';
import { Map } from 'immutable';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FindPeople from 'src/components/findPeople';
import Followers from 'src/components/followers';
import Following from 'src/components/following';
import YourCircles from 'src/components/yourCircles';
import * as globalActions from 'src/store/actions/globalActions';

import { IPeopleComponentProps } from './IPeopleComponentProps';
import { IPeopleComponentState } from './IPeopleComponentState';

// - Import app components
// - Import API

// - Import actions
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
    const { goTo, setHeaderTitle, t} = this.props
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

    const {circlesLoaded, t} = this.props
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
const translateWrraper = withTranslation('translations')(PeopleComponent as any)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translateWrraper as any) as any)
