// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Map} from 'immutable'
import { translate, Trans } from 'react-i18next'

// - Material-UI
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import CardHeader from '@material-ui/core/CardHeader'

// - Import app components
import ActivityProgress from 'layouts/activityProgress'

// - Import API

// - Import actions
import * as globalActions from 'store/actions/globalActions'

import { IBountyBoxComponentProps } from './IBountyBoxComponentProps'
import { IBountyBoxComponentState } from './IBountyBoxComponentState'
import { bountyBoxStyles } from './bountyBoxStyles'

/**
 * Create component class
 */
export class BountyBoxComponent extends Component<IBountyBoxComponentProps,IBountyBoxComponentState> {

  /**
   * Component constructor
   */
  constructor (props: IBountyBoxComponentProps) {
    super(props)

    // Defaul state
    this.state = {

    }

    // Binding functions to `this`

  }

  /**
   * Reneder component DOM
   */
  render () {

    const { setHeaderTitle, t, classes, caption, text, image, subheader, value } = this.props
    return (
      <Grid item xs={12} sm={6} md={4}>
                    <ListItem button>
                        <Paper className={classes.paper} elevation={4}>
                            <ActivityProgress 
                            caption={caption}
                            value={value}/>
                            <Typography className={classes.text}>
                                {text}
                            </Typography>
                            <CardHeader
                                className={classes.cardHeader}
                                avatar={<Avatar src={image} className={classes.bigAvatar} />}
                                subheader={<Typography variant='caption'>{subheader}</Typography>}
                            />
                        </Paper>
                    </ListItem>
                </Grid>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IBountyBoxComponentProps) => {

  return {
    setHeaderTitle : (title: string) => dispatch(globalActions.setHeaderTitle(title))

  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IBountyBoxComponentProps) => {

  return {

  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(BountyBoxComponent)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(bountyBoxStyles as any) (translateWrraper as any) as any)
