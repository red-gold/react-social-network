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
import { IFunProps } from './IFunProps'
import { IFunState } from './IFunState'
import { UserTie } from 'core/domain/circles/userTie'
import { connectFun } from './connectFun'
import SearchComponent from '../search'
import classNames from 'classnames'
import { funStyles } from './funStyles'
import { withRouter } from 'react-router-dom'

/**
 * Create component class
 */
export class HelpComponent extends Component<IFunProps, IFunState> {

  /**
   * Fields
   */
  iframeRef: React.RefObject<HTMLIFrameElement>

  /**
   * Component constructor
   *
   */
  constructor(props: IFunProps) {
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

export default withRouter<any>(connectFun(withStyles(funStyles as any)(translateWrraper as any) as any))
