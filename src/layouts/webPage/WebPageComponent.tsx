// - Import react components
import React, { Component } from 'react'
import classNames from 'classnames'
import ReactDOM from 'react-dom'

// - Material UI
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import DoneIcon from '@material-ui/icons/Done'
import Slide from '@material-ui/core/Slide'
import Table from '@material-ui/core/Table/Table'
import TableBody from '@material-ui/core/TableBody/TableBody'
import TableCell from '@material-ui/core/TableCell/TableCell'
import TableHead from '@material-ui/core/TableHead/TableHead'
import TableRow from '@material-ui/core/TableRow/TableRow'
import DialogContent from '@material-ui/core/DialogContent'
import Backdrop, { BackdropProps } from '@material-ui/core/Backdrop'

import { webPageStyles } from './webPageStyles'
import { IWebPageProps } from './IWebPageProps'
import { IWebPageState } from './IWebPageState'

function Transition(props: any) {
  return <Slide direction='up' {...props} />
}

export class BackDropIOSWorkaround extends React.PureComponent<BackdropProps> {
  protected onTouchMove(event: React.TouchEvent<HTMLDivElement>): void {
    alert('hello')
    event.preventDefault()
  }

  public render(): JSX.Element {
    return (
      <Backdrop {...this.props} onTouchMove={this.onTouchMove} />
    )
  }
}

/**
 * Create component class
 */
export class WebPageComponent extends Component<IWebPageProps, IWebPageState> {

  /**
   * Fields
   */
  iframeRef: React.RefObject<HTMLIFrameElement>
  targetElement: any = null

  /**
   * Component constructor
   */
  constructor(props: IWebPageProps) {
    super(props)
    this.iframeRef = React.createRef()
    // Defaul state

    // Binding functions to `this`

  }

  /**
   * Handle load iframe
   */
  onLoad() {
    alert('loaded')
  }

  componentDidUpdate() {

    if (this.props.open) {

    } else {

    }

  }

  /**
   * Reneder component DOM
   */
  render() {
    const { classes, title, onClose, open, url } = this.props

    return (
      <Dialog
        id={'ios-modal'}
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >

        <AppBar color='secondary' className={classes.appBar}>
          <Toolbar>
            <IconButton color='inherit' onClick={onClose} aria-label='Close'>
              <VpnKeyIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' className={classes.flex}>
              {title}
            </Typography>
            <IconButton color='inherit' onClick={onClose} aria-label='Close'>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.iosDialog}>
          {url ? <iframe ref={this.iframeRef} src={url} width='100%' height='100%' frameBorder='0'></iframe> : ''}

        </div>

      </Dialog>

    )
  }
}

// - Connect component to redux store
export default withStyles(webPageStyles as any)(WebPageComponent as any)
