// - Import react components
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Announcement';
import StringAPI from 'api/StringAPI';
import { Map } from 'immutable';
import FacebookPage from 'layouts/facebookPage';
import InstagramIcon from 'layouts/instagramIcon';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import InstagramLogin from 'react-instagram-login';
import { connect } from 'react-redux';
import { Timeline } from 'react-twitter-widgets';
import config from 'src/config';
import * as globalActions from 'src/store/actions/globalActions';
import { authorizeSelector } from 'store/reducers/authorize';
import { postSelector } from 'store/reducers/posts';

import PostStreamComponent from '../postStream';
import { externalSocialStyles } from './externalSocialStyles';
import { IExternalSocialProps } from './IExternalSocialProps';
import { IExternalSocialState } from './IExternalSocialState';

// - Material-UI
// - Import app components
// - Import actions
/**
 * Create component class
 */
export class ExternalSocialComponent extends Component<IExternalSocialProps, IExternalSocialState> {

  static propTypes = {

  }

  /**
   * Component constructor
   *
   */
  constructor(props: IExternalSocialProps) {
    super(props)

    // Defaul state
    this.state = {
    }

    // Binding functions to `this`

  }

  componentWillMount() {

  }

  /**
   * Twitter element
   */
  twitterElement = (twitterId: string) => {
    const { t, classes } = this.props
    return (
      <>
        <Typography className={classes.title} variant={'h6'} >
          {t!('externalSocial.yourAccountCaption', { account: t!('externalSocial.twitterCaption') })}
        </Typography>
      <Timeline
        dataSource={{
          sourceType: 'profile',
          screenName: twitterId
        }}
        options={{
          username: twitterId,
          height: '600',
          width: '500',
        }}
        onLoad={() => console.log('Timeline is loaded!')}
      />
      </>
    )
  }

  /**
   * Facebook element
   */
  facebookElement = (facebookId: string) => {
    const { t, classes } = this.props
    const width = window.innerWidth > 550 ? 550 : 400
    return (
      <>
        <Typography className={classes.title} variant={'h6'} >
          {t!('externalSocial.yourAccountCaption', { account: t!('externalSocial.facebookCaption') })}
        </Typography>
        <FacebookPage
          adaptContainerWidth width={width}
          height={800} appId={'185827285565686'}
          href={`https://www.facebook.com/${facebookId}`}
          tabs={['timeline', 'events', 'messages']} />
      </>
    )

  }

  /**
   * Instagram element
   */
  instagramElement = () => {
    const { classes, instagramPosts, t } = this.props
    const loginElement = (
      <div>
        <InstagramLogin
          clientId={config.exteranlSocial.instagramClientId}
          buttonText=''
          cssClass={classes.loginRootButton}
          implicitAuth
          onSuccess={this.responseInstagram}
          onFailure={this.responseInstagram}
        >
        
          <Button component='span' color={'primary'} variant={'raised'}> 
          {t!('externalSocial.instagramLoginButton')} 
          <InstagramIcon  className={classes.instagramIcon} viewBox='0 0 520 520'  />
          </Button>
        </InstagramLogin>

      </div>
    )
    return (
      <>
        <Typography className={classes.title} variant={'h6'} >
          {t!('externalSocial.yourAccountCaption', { account: t!('externalSocial.instagramCaption') })}
        </Typography>
        {instagramPosts.count() > 0 ? <PostStreamComponent displayWriting={false} posts={instagramPosts} /> : loginElement}
      </>
    )
  }

  /**
   * Config need message element
   */
  configNeedElement = () => {
    const { classes, t, social, currentUser } = this.props
    return (
      <Paper className={classes.noConfigPaper}>
        <Typography className={classes.needConfigText} variant='subtitle1'>
          <InfoIcon className={classes.infoIcon} />{t!('externalSocial.needConfig', { social, userId: currentUser ? currentUser!.userId : 0 })}
        </Typography>
      </Paper>
    )
  }

  /**
   * Response login instagram
   */
  responseInstagram = (response: any) => {
    const { loadTwitterMedia } = this.props
    if (response && loadTwitterMedia) {
      loadTwitterMedia(response)
    }
  }

  /**
   * Loading root element
   */
  loadRootElemtn = () => {
    const { social, currentUser } = this.props
    if (social && currentUser) {
      if (social === 'twitter' && currentUser.twitterId && !StringAPI.isEmpty(currentUser.twitterId)) {
        return this.twitterElement(currentUser.twitterId!)
      }
      if (social === 'facebook' && currentUser.facebookId && !StringAPI.isEmpty(currentUser.facebookId)) {
        return this.facebookElement(currentUser.facebookId!)
      }
      if (social === 'instagram') {
        return this.instagramElement()
      }
    }
    return this.configNeedElement()
  }

  /**
   * Reneder component DOM
   * 
   */
  render() {

    const {classes } = this.props
    return (
      <div className={classes.root}>

        {this.loadRootElemtn()}

      </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IExternalSocialProps) => {
  return {
    loadTwitterMedia: (accessToken: string) => dispatch(globalActions.dbLoadTwitterMedia(accessToken))
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IExternalSocialProps) => {
  const { socialName } = ownProps.match.params
  return {
    
    social: socialName,
    currentUser: authorizeSelector.getCurrentUser(state).toJS(),
    instagramPosts: postSelector.getInstagramPosts(state)

  }
}

// - Connect component to redux store
const translateWrraper = withTranslation('translations')(ExternalSocialComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(externalSocialStyles as any)(translateWrraper as any))