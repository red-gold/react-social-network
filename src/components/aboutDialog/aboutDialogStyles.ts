import green from '@material-ui/core/colors/green'

export const aboutDialogStyles = (theme: any) => ({
  fullPageXs: {

  },
  root: {
    flexGrow: 1,
    overflow: 'hidden'
  },
  gridTileRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    maxHeight: 380
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(8),
    marginBottom: 20,
    backgroundColor: theme.palette.background.default,
  },
  flex: {
    flexGrow: 1,
  },
  paper: {
    minHeight: '500px',
    minWidth: '500px',
    maxWidth: '500px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      maxHeight: '100%',
      maxWidth: '100%',
      minWidth: '100%',
      borderRadius: 0,
      margin: 0
    }
  },
  information: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  title: {
    color: 'rgba(0,0,0,.87)',
    font: '400 14px/20px Roboto,RobotoDraft,Helvetica,Arial,sans-serif',
    fontWeight: 500,
    margin: '0 0 12px 14px'
  },
  rootInfo: {
    flexDirection: 'column',
    padding: '22px 20px 0',
    display: 'flex',
    backgroundColor: '#f9f9f9',
    alignItems: 'flex-start'
  },
  subtitleInfo: {
    color: 'rgba(0,0,0,.54)',
    font: '400 12px Roboto,RobotoDraft,Helvetica,Arial,sans-serif',
    fontWeight: 500
  },
  contentInfo: {
    marginTop: 10,
    color: 'rgba(0,0,0,.87)',
    font: '400 14px/20px Roboto,RobotoDraft,Helvetica,Arial,sans-serif'
  },
  paperInfo: {
    width: '100%',
    flex: '1 1 auto',
    overflow: 'hidden',
    padding: '16px 14px'
  },
  infoItem: {
    paddingBottom: 10,
  },
  content: {
    maxHeight: 436,
    overflowY: 'auto',
    paddingBottom: 15
  }
})