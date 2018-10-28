// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Map } from 'immutable'
import { translate, Trans } from 'react-i18next'
import queryString from 'query-string'

// - Material UI
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

// - Import app components
import UserBoxList from 'components/userBoxList'
import LoadMoreProgressComponent from 'layouts/loadMoreProgress'

// - Import API

// - Import actions
import * as userActions from 'store/actions/userActions'
import { ISponserProps } from './ISponserProps'
import { ISponserState } from './ISponserState'
import { UserTie } from 'core/domain/circles/userTie'
import { connectSponser } from './connectSponser'
import SearchComponent from '../search'
import classNames from 'classnames'
import { sponserStyles } from './sponserStyles'
import { withRouter } from 'react-router-dom'

/**
 * Create component class
 */
export class SponserComponent extends Component<ISponserProps, ISponserState> {

  /**
   * Fields
   */
  iframeRef: React.RefObject<HTMLIFrameElement>

  /**
   * Component constructor
   *
   */
  constructor(props: ISponserProps) {
    super(props)
    this.iframeRef = React.createRef()

    // Defaul state
    this.state = {

    }

  }

  /**
   * Reneder component DOM
   * 
   */
  render() {
    const { t, classes } = this.props
    return (
      <div className={classes.root}>
        
      </div>
    )
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(SponserComponent as any)

export default withRouter<any>(connectSponser(withStyles(sponserStyles as any)(translateWrraper as any) as any)) as typeof SponserComponent
