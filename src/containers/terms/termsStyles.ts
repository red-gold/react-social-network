const drawerWidth = 240

export const termsStyles = (theme: any) => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: {
    backgroundColor: theme.palette.secondary.main,
    padding: 10,
    textAlign: 'center'
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    overflowY: 'auto'    
  },
  appBarTitle: {
    fontSize: 'x-large',
    textAlign: 'center',
    marginLeft: 15,
    fontWeight: 300,
    paddingTop: '8%',
    color: theme.palette.primary.main
  },
  container: {
    padding: 40,
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