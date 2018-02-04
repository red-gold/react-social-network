// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { grey } from 'material-ui/colors'
import SvgClose from 'material-ui-icons/Close'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import { IDialogTitleComponentProps } from './IDialogTitleComponentProps'
import { IDialogTitleComponentState } from './IDialogTitleComponentState'

/**
 * Create component class
 */
export default class DialogTitleComponent extends Component<IDialogTitleComponentProps,IDialogTitleComponentState> {

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

  styles = {
    contain: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    title: {
      color: 'rgba(0,0,0,0.87)',
      flex: '1 1',
      font: '500 20px Roboto,RobotoDraft,Helvetica,Arial,sans-serif'
    }
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IDialogTitleComponentProps) {
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

    const { buttonLabel, disabledButton, onClickButton, onRequestClose, title } = this.props

    return (
      <div className='g__dialog-title'>
        <div style={this.styles.contain as any}>
          <div style={{ paddingRight: '10px' }}>
            <SvgClose onClick={onRequestClose} style={{ cursor: 'pointer' }} />
          </div>
          <div style={this.styles.title}>
            {title || ''}
          </div>
        { buttonLabel ? (<div style={{ marginTop: '-9px' }}>
            <Button color='primary' disabled={disabledButton ? disabledButton : false} onClick={onClickButton || (x => x)}> {buttonLabel || ''} </Button>
          </div>) : ''}
        </div>
        <Divider />
      </div>
    )
  }
}
