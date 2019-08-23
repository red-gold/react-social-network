// - Import react components
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ActivityProgress from 'layouts/activityProgress';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as globalActions from 'store/actions/globalActions';

import { bountyBoxStyles } from './bountyBoxStyles';
import { IBountyBoxComponentProps } from './IBountyBoxComponentProps';
import { IBountyBoxComponentState } from './IBountyBoxComponentState';

// - Material-UI
// - Import app components
// - Import API

// - Import actions
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

    const { classes, caption, text, image, subheader, value } = this.props
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
const mapDispatchToProps = (dispatch: any) => {

  return {
    setHeaderTitle : (title: string) => dispatch(globalActions.setHeaderTitle(title))

  }
}

/**
 * Map state to props
 */
const mapStateToProps = () => {

  return {

  }
}

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(BountyBoxComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(bountyBoxStyles as any) (translateWrapper as any))
