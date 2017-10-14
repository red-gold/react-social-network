// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { grey400 } from 'material-ui/styles/colors'
import SvgClose from 'material-ui/svg-icons/navigation/close'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'



/**
 * Create component class
 */
export default class DialogTitle extends Component {

  static propTypes = {
    /**
     * The label of right button
     */
    buttonLabel: PropTypes.string,
    /**
     * If it's true button will be disabled
     */
    disabledButton: PropTypes.bool,
    /**
     * Call the funtion the time is clicked on right button
     */
    onClickButton: PropTypes.func,
    /**
     * The function will be called the time is clicked on close
     */
    onRequestClose: PropTypes.func.isRequired,
    /**
     * The title of dialog box
     */
    title: PropTypes.string
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {
    super(props)

    //Defaul state
    this.state = {
    }

    // Binding functions to `this`


  }


  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {

    const styles = {
      contain: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between"
      },
      title: {
        color: 'rgba(0,0,0,0.87)',
        flex: '1 1',
        font: '500 20px Roboto,RobotoDraft,Helvetica,Arial,sans-serif'
      }
    }

    const { buttonLabel, disabledButton, onClickButton, onRequestClose, title } = this.props

    return (
      <div className='g__dialog-title'>
        <div style={styles.contain}>
          <div style={{ paddingRight: '10px' }}>
            <SvgClose onClick={onRequestClose} hoverColor={grey400} style={{ cursor: 'pointer' }} />
          </div>
          <div style={styles.title}>
            {title || ''}
          </div>
        { buttonLabel ? (<div style={{ marginTop: '-9px' }}>
            <FlatButton label={buttonLabel || ''} primary={true} disabled={disabledButton ? disabledButton : false} onClick={onClickButton || (() => _)} />
          </div>) : ''}
        </div>
        <Divider />
      </div>
    )
  }
}

