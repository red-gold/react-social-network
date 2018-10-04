export const profileStyles = (theme: any) => ({
    banner: {
      backgroundAttachment: 'scroll',
      borderRadius: '2px',
      backgroundRepeat: 'unset !important',
      backgroundPosition: 'center center !important',
      [theme.breakpoints.down('xs')]: {
        backgroundAttachment: 'scroll',
        height: '220px !important'
      }
      
    },
    bannerContainer: {
        height: 384,
        [theme.breakpoints.down('xs')]: {
          height: '260px !important'
        }

    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    }
  })