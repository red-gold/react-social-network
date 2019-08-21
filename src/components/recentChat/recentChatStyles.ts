
export const recentChatStyles = (theme: any) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing(3),
  },
  list: {
    maxHeight: 380,
    overflowY: 'auto',
    width: '98%',
    overflowX: 'hidden',
    minHeight: 16,
    [theme.breakpoints.down('xs')]: {
      maxHeight: 'calc(100% - 32px)',
    }
  },
  container: {
    width: 400
  },
  paper: {
    outline: 'none',
    position: 'absolute',
    minWidth: '16px',
    maxWidth: 'calc(100% - 32px)',
  },
  fullPageXs: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: 0,
      overflowY: 'auto',
      maxHeight: '100%',
      maxWidth: '100%',
      position: 'relative',
      top: '0 !important',
      left: '0 !important',
    }
  },
  header: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  noData: {
    textAlign: 'center',
    padding: 50
  }
})
