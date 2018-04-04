// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import { Map } from 'immutable'

// - Import app components

// - Import API

// - Import actions
import * as imageGalleryActions from 'store/actions/imageGalleryActions'

import { IUserAvatarComponentProps } from './IUserAvatarComponentProps'
import { IUserAvatarComponentState } from './IUserAvatarComponentState'

/**
 * Create component class
 */
export class UserAvatarComponent extends Component<IUserAvatarComponentProps,IUserAvatarComponentState> {

  static propTypes = {

    /**
     * Use for getting url address from server
     */
    fileName: PropTypes.string,
    /**
     * User full name
     */
    fullName: PropTypes.string,
    /**
     * Avatar style
     */
    style: PropTypes.object,
    /**
     * Avatar size
     */
    size: PropTypes.number,
    /**
     * Trigger on touch tap
     */
    onClick: PropTypes.func

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IUserAvatarComponentProps) {
    super(props)

    // Defaul state
    this.state = {
    }

    // Binding functions to `this`

  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {
    let { fileName, fullName, style, size, onClick } = this.props

    return (
      <div style={{display: 'inherit'}}>
       {(fileName && fileName !== '' && fileName !== 'noImage' )
       ? ( <Avatar src={fileName ? fileName : ' '} style={{...style, backgroundColor: '#ffffff', width: size || 36, height: size || 36}} onClick={onClick} />)
        : (<Avatar style={{...style, backgroundColor: '#00bcd4', width: size || 36, height: size || 36}} onClick={onClick}>{fullName ? fullName.slice(0, 1) : ''}</Avatar>) }
      </div>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: Function, ownProps: IUserAvatarComponentProps) => {
  return {
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IUserAvatarComponentProps) => {
  return {
    avatarURL: state.getIn(['imageGallery', 'imageURLList']),
    imageRequests: state.getIn(['imageGallery', 'imageRequests'])

  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(UserAvatarComponent as any)
