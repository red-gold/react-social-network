// - Import react components
import { grey } from '@material-ui/core/colors';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import PostStreamComponent from 'src/containers/postStream';

import { connectStream } from './connectStream';
import { IStreamComponentProps } from './IStreamComponentProps';
import { IStreamComponentState } from './IStreamComponentState';
import { streamStyles } from './streamStyles';

// - Material-UI
// - Import app components
// - Import API
// - Import actions
// - Create StreamComponent component class
export class StreamComponent extends Component<IStreamComponentProps, IStreamComponentState> {

  static propTypes = {
    /**
     * A list of post
     */
    posts: PropTypes.object,

    /**
     * The title of home header
     */
    homeTitle: PropTypes.string

  }

  styles = {
    postWritePrimaryText: {
      color: grey[400],
      cursor: 'text'
    },
    postWtireItem: {
      fontWeight: '200'
    }
  }

  /**
   * Component constructor
   *
   */
  constructor(props: IStreamComponentProps) {
    super(props)

    this.state = {
    }

    // Binding functions to `this`
    this.loadPosts = this.loadPosts.bind(this)

  }
  componentWillMount() {
    const { setHomeTitle, t } = this.props
    setHomeTitle!(t!('header.home'))
  }

  /**
   * Load posts
   */
  loadPosts() {
    const {loadStream, page, increasePage} = this.props
    if (loadStream && page !== undefined && increasePage) {
      loadStream!(page)
      increasePage()
    }
  }
  /**
   * Reneder component DOM
   * 
   */
  render() {

    const { hasMorePosts, posts, requestId, currentUser} = this.props

    return (
      <div className='stream-root'>
        <PostStreamComponent homeTitle={currentUser ? currentUser.fullName : ''} requestId={requestId} posts={posts} loadStream={this.loadPosts} hasMorePosts={hasMorePosts} displayWriting />
      </div>
    )
  }
}

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(StreamComponent as any)

export default withRouter<any, any>(connectStream(withStyles(streamStyles)(translateWrapper as any) as any))