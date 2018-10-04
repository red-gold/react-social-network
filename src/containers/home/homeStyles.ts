
const drawerWidth = 220
export const homeStyles = (theme: any) => ({
  root: {
    width: '100%',
    height: '100%',
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    // overflowY: 'auto'
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: {
    backgroundColor: theme.palette.secondary.main,
    padding: 10,
    textAlign: 'center'
  },
  drawerPaper: {
    maxWidth: drawerWidth,
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
drawerPaperLarge: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      height: '100%',
    },
    top: 70,
    backgroundColor: '#fafafa',
    borderRight: 0
  },
  menu: {
    height: '100%',
  },
  content: {
    backgroundColor: 'transparent',
    width: '100%',
    flexGrow: 1,
    paddingTop: 15,
    padding: theme.spacing.unit * 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 44,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 44,
      paddingTop: 15,
    },
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 44,
      paddingTop: 15,
    },
  },
  'content-left': {
    marginLeft: 0,
  },
  'content-right': {
    marginRight: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth
    }
  },
  'contentShift-right': {
    marginRight: 0,
    [theme.breakpoints.up('md')]: {
      marginRight: drawerWidth
    }
  },
  logo: {
    fill: 'currentColor',
    height: '2em',
    display: 'inline-block', 
    fontSize: '17px',
    transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    userSelect: 'none',
    flexShrink: 0
}
})