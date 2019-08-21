export const profileAlbumStyles = (theme: any) => ({
  card: {
    overflow: 'hidden',
    WebkitTransition: 'all .218s cubic-bezier(0.4,0.0,0.2,1)',
    transition: 'all .218s cubic-bezier(0.4,0.0,0.2,1)',
    margin: '0 auto',
    boxShadow: '0 2px 11px rgba(0,0,0,0.2)',
    maxWidth: '1020px',
    // height: 600
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
    backgroundColor: theme.palette.secondary.light
  },
  tabsIndicator: {
    backgroundColor: 'white',
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
      color: 'white',
      fontSize: '1.3125rem !important',
      fontWeight: 500,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1.16667em'
    },
    '&:focus': {
      color: 'white',
    },
  },
  tabSelected: {

  },
  header: {
    padding: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  content: {
    padding: '15px 15px 15px 15px',
  }
})