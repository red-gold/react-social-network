// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Map } from 'immutable'
import queryString from 'query-string'
import { translate, Trans } from 'react-i18next'

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
import { IHelpProps } from './IHelpProps'
import { IHelpState } from './IHelpState'
import { UserTie } from 'core/domain/circles/userTie'
import { connectHelp } from './connectHelp'
import SearchComponent from '../search'
import classNames from 'classnames'
import { helpStyles } from './helpStyles'
import { withRouter } from 'react-router-dom'

/**
 * Create component class
 */
export class HelpComponent extends Component<IHelpProps, IHelpState> {

  /**
   * Fields
   */
  iframeRef: React.RefObject<HTMLIFrameElement>

  /**
   * Component constructor
   *
   */
  constructor(props: IHelpProps) {
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
const translateWrraper = translate('translations')(HelpComponent as any)

export default withRouter<any>(connectHelp(withStyles(helpStyles as any)(translateWrraper as any) as any))
