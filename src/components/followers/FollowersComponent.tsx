// - Import react components
import UserBoxList from 'components/userBoxList';
import { Map } from 'immutable';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { IFollowersComponentProps } from './IFollowersComponentProps';
import { IFollowersComponentState } from './IFollowersComponentState';

// - Import app components
// - Import API

// - Import actions

/**
 * Create component class
 */
export class FollowersComponent extends Component<IFollowersComponentProps,IFollowersComponentState> {

  static propTypes = {

  }

  /**
   * Component constructor
   *
   */
  constructor (props: IFollowersComponentProps) {
    super(props)

    // Defaul state
    this.state = {

    }

    // Binding functions to `this`

  }

  /**
   * Reneder component DOM
   * 
   */
  render () {
    const {t} = this.props
    const followers = this.props.followers!
    return (
          <div>
            {(followers && followers.keySeq().count() !== 0) ? (<div>
              <div className='profile__title'>
                {t!('people.followersLabel')}
                        </div>
                        <UserBoxList users={followers} />
              <div style={{ height: '24px' }}></div>
              </div>)
              : (<div className='g__title-center'>
                 {t!('people.noFollowersLabel')}
               </div>)}
          </div>
    )
  }
}

  /**
   * Map dispatch to props
   */
const mapDispatchToProps = () => {
  return{

  }
}

  /**
   * Map state to props
   */
const mapStateToProps = (state: Map<string, any>) => {

  const followers = state.getIn(['circle', 'userTieds'], Map({}))
  return{
    
    followers
  }
}

  // - Connect component to redux store
const translateWrapper = withTranslation('translations')(FollowersComponent as any)

export default connect(mapStateToProps,mapDispatchToProps)(translateWrapper)
