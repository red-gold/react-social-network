import { createStyles } from '@material-ui/core'

export const postWriteStyles = (theme: any) => createStyles({
  fullPageXs: {
    minWidth: 500,
    maxWidth: 500,
    maxHeight: 540,
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      width: '100%',
      height: '100%',
      margin: 0,
      overflowY: 'auto'
    }
  },
  backdrop: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'fixed',
    willChange: 'opacity',
    backgroundColor: 'rgba(251, 249, 249, 0.5)',
    WebkitTapHighlightColor: 'transparent'
  },
  input: {

  },
  content: {
    padding: 0,
    paddingTop: 0
  },
  dialogRoot: {
    paddingTop: 0
  },
  popperOpen: {
    zIndex: 10
  },
  popperClose: {
    pointerEvents: 'none',
    zIndex: 0
  },
  author: {
    paddingRight: 70
  },
  dialogTitle: {
    padding: 0
  },
  iconButtonsRoot: {
    justifyContent: 'flex-start',
    margin: '0px 4px'
  },
  playVideo: {
    position: 'absolute',
    right: '45%',
    top: '45%',
    cursor: 'pointer',
    backgroundColor: '#f1efeca3',
    borderRadius: '50%',
    height: 60,
    padding: 0
  },
  playIcon: {
    width: 60,
    height: 60,
    fill: 'red'
  },
  noDisplay: {
    display: 'none'
  },
  playIconButtonRoot: {
    width: 60,
    height: 60
  },
  galleryActions: {
    margin: 0,
    background: '#fff',
    WebkitBoxSizing: 'border-box',
    boxSizing: 'border-box',
    height: 56,
    textAlign: 'center',
    padding: 4,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  galleryDialogTitle: {
    color: '#676767'
    // flex: 1
  },
  galleryDialogIcon: {

  },
  galleryAction: {
    margin: 0,
    padding: 0,
    minWidth: 0
  },
  devider: {
    marginBottom: 10
  },
  videoGallery: {
  },
  permission: {
    fontWeight: 400,
    fontSize: '14px',
    cursor: 'pointer',
    color: 'blue'
  }
})