 
export const footerStyles = (theme: any) => ({
  root: {
    backgroundColor: '#fafafa',
    order: 5,
    padding: '0 20px',
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    margin: 0,
    position: 'relative',
    width: '100%'
  },
  content: {
    fontSize: '12px',
    fontWeight: 500,
    display: 'flex',
    margin: '0 auto',
    textTransform: 'uppercase',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  nav: {
    alignItems: 'stretch',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    flexShrink: 0,
    margin: 0,
    padding: 0,
    position: 'relative'
  },
  list: {
    flexGrow: 1,
    marginBottom: '3px',
    marginRight: '16px',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
      textAlign: 'center'
    }
  },
  item: {
    display: 'inline-block',
    marginBottom: '7px',
    marginRight: '16px',
    fontWeight: 500,
    whiteSpace: 'nowrap'
  },
  companyName: {
    color: '#999',
    lineHeight: 3,
    whiteSpace: 'nowrap'
  },
  getAppRoot: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    margin: 0,
    padding: 0,
    position: 'relative',
    marginTop: '15px'
  },
  getApp: {
    color: '#262626',
    fontSize: '14px',
    lineHeight: '18px',
    margin: '10px 20px',
    textAlign: 'center'
  },
  getAppIconRoot: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '10px 0',
    alignItems: 'stretch',
    boxSizing: 'border-box',
    display: 'flex',
    flexShrink: 0,
    padding: 0,
    position: 'relative',

  },
  iosAppLink: {
    marginRight: '8px',
    lineHeight: '85px'
  },
  appStoreIcon: {
    height: '40px'
  },
  googlePlayIcon: {
    height: '56px'
  },
})