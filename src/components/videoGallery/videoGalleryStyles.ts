
export const videoGalleryStyles = (theme: any) => ({
    fullPageXs: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            height: '100%',
            margin: 0,
            overflowY: 'auto'
        },
    },
    gridList: {
        width: 500,
        height: 450,
        overflowY: 'auto'
    },
    noDisplay: {
        display: 'none !important'
    },
    video: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0
    },
    videoRoot: {
        position: 'relative',
        padding: '39.25%',
        width: '100%',
        height: '100%'
    },
    previewActions: {
        justifyContent: 'space-between',
        display: 'flex',
        marginTop: 10,
        width: '100%',
        height: '100%'
    
    }
})