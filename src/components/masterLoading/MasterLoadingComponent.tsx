// - Import react components
import React, { Component } from 'react'
import { CircularProgress } from 'material-ui/Progress'
import Dialog from 'material-ui/Dialog'
import red from 'material-ui/colors/red'
import { IMasterLoadingComponentProps } from './IMasterLoadingComponentProps'
import { IMasterLoadingComponentState } from './IMasterLoadingComponentState'
import Grid from 'material-ui/Grid/Grid'
import { Typography } from 'material-ui'

// - Import app components

// - Create MasterLoading component class
export default class MasterLoadingComponent extends Component<IMasterLoadingComponentProps, IMasterLoadingComponentState> {

  // Constructor
  constructor(props: IMasterLoadingComponentProps) {
    super(props)
    // Binding functions to `this`

  }

  loadProgress() {
    const { error, timedOut, pastDelay } = this.props
    if (error) {
      return (
        <Grid container>
          <Grid item>
            <CircularProgress style={{ color: red[500] }} size={50} />
          </Grid>
          <Grid item style={{ zIndex: 1 }}>
            <Typography variant='title' color='primary' style={{ marginLeft: '15px' }} >
              Unexpected Error Happened ...
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
            <Typography variant='title' color='primary' style={{ marginLeft: '15px' }} >
              It takes long time ...
          </Typography>
          </Grid>
        </Grid>
      )
    } else if (pastDelay) {
      return (
        <Grid container>
          <Grid item>
            <CircularProgress size={50} />
          </Grid>
          <Grid item style={{ zIndex: 1 }}>
            <Typography variant='title' color='primary' style={{ marginLeft: '15px' }} >
              Loading...
          </Typography>
          </Grid>
        </Grid>
      )
    } else {
      return (
        <Grid container>
          <Grid item>
            <CircularProgress size={50} />
          </Grid>
          <Grid item style={{ zIndex: 1 }}>
            <Typography variant='title' color='primary' style={{ marginLeft: '15px' }} >
              Loading...
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
