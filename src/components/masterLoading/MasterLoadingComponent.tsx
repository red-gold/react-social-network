// - Import react components
import React, { Component } from 'react'
import { translate, Trans } from 'react-i18next'

import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import red from '@material-ui/core/colors/red'
import { IMasterLoadingComponentProps } from './IMasterLoadingComponentProps'
import { IMasterLoadingComponentState } from './IMasterLoadingComponentState'
import Grid from '@material-ui/core/Grid/Grid'
import { Typography, withStyles } from '@material-ui/core'
import { connect } from 'react-redux'

import config from 'src/config'
import { masterLoadingStyles } from './masterLoadingStyles'

// - Import app components

// - Create MasterLoading component class
export class MasterLoadingComponent extends Component<IMasterLoadingComponentProps, IMasterLoadingComponentState> {

  // Constructor
  constructor(props: IMasterLoadingComponentProps) {
    super(props)
    // Binding functions to `this`

  }

  loadProgress() {
    const { error, timedOut, pastDelay, t, theme } = this.props
    if (error) {
      console.trace('error', error)
      return (
        <Grid container>
          <Grid item>
            <CircularProgress style={{ color: red[500] }} size={50} />
          </Grid>
          <Grid item style={{ zIndex: 1 }}>
            <Typography variant='h6' color='primary' style={{ marginLeft: '15px' }} >
             {t!('masterLoading.unexpectedError')}
          </Typography>
          </Grid>
        </Grid>
      )
    } else if (timedOut) {
      return (
        <Grid container>
          <Grid item>
            <CircularProgress style={{ color: red[500] }} size={50} />
          </Grid>
          <Grid item style={{ zIndex: 1 }}>
            <Typography variant='h6' color='primary' style={{ marginLeft: '15px' }} >
            {t!('masterLoading.timeout')}
          </Typography>
          </Grid>
        </Grid>
      )
    } else if (pastDelay) {
      return (
        <Grid container>
          <Grid item>
            <CircularProgress style={{color: theme.palette.primary.light}} size={50} />
          </Grid>
          <Grid item style={{ zIndex: 1 }}>
            <Typography variant='h6' color='primary' style={{ marginLeft: '15px' }} >
            {t!('masterLoading.loading')}
          </Typography>
          </Grid>
        </Grid>
      )
    } else {
      return (
        <Grid container>
          <Grid item>
            <CircularProgress style={{color: theme.palette.primary.light}} size={50} />
          </Grid>
          <Grid item style={{ zIndex: 1 }}>
            <Typography variant='h6' color='primary' style={{ marginLeft: '15px' }} >
            {t!('masterLoading.loading')}
          </Typography>
          </Grid>
        </Grid>
      )
    }
  }

  // Render app DOM component
  render() {
    return (

      <div className='mLoading__loading'>
        {
          this.loadProgress()
        }

      </div>

    )
  }

}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IMasterLoadingComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IMasterLoadingComponentProps) => {
  return {

  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(MasterLoadingComponent)

const stylesWrappedComponent = withStyles(masterLoadingStyles, {withTheme: true})(translateWrraper as any) as any
export default connect(mapStateToProps, mapDispatchToProps)(stylesWrappedComponent)