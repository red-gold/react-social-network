
export const postStyles = (theme: any) => ({
    iconButton: {
      marginLeft: 5
    },
    vote: {
      display: 'flex',
      flex: 1
    },
    voteCounter: {
      fontWeight: 400,
      color: '#777',
      fontSize: 12,
      marginRight: 6,
      marginLeft: -2,
      lineHeight: '48px'
    },
    commentCounter: {
      fontWeight: 400,
      color: '#777',
      fontSize: 12,
      lineHeight: '48px',
      marginLeft: -2,
    },
    popperOpen: {
      zIndex: 10
    },
    popperClose: {
      pointerEvents: 'none',
      zIndex: 0
    },
    postBody: {
      wordWrap: 'break-word',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: '0.875rem',
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1.46429em',
      whiteSpace: 'pre-line'
    },
    image: {
      width: '100%',
      height: 500
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
    cardMedia: {
      position: 'relative'
    },
    fullPageXs: {
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        height: '100%',
        margin: 0,
        overflowY: 'auto'
      }
    }
  })