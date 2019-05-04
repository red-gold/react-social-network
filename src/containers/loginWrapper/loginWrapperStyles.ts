export const loginWrapperStyles = (theme: any) => ({
    logo: {
        fill: 'currentColor',
        height: '2em',
        display: 'inline-block',
        fontSize: '21px',
        transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        userSelect: 'none',
        flexShrink: 0
    },
    pageContainer: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: '1 0 auto',
        padding: '55px 0 11px 0',
        [theme.breakpoints.down('xs')]: {
            padding: '0px 0 11px 0'
    
        },
        '&:before': {
            position: 'absolute',
            top: '-145px',
            left: '0',
            width: '100%',
            minHeight: '365px',
            height: '60vh',
            content: '" "',
            // background: `${theme.palette.secondary.light} url(${config.settings.publicCover})`,
            // backgroundColor: '#1e4fea;',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            transition: 'background .4s',
            backgroundPositionY: 'initial',
            backgroundPositionX: 'center',
        }
    },
    pageItem: {
        zIndex: 1,
        minWidth: 435,
        [theme.breakpoints.down('xs')]: {
            minWidth: '100%'
          },
    },
    appbar: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 15,
    },
    contain: {
        backgroundColor: 'white',
        [theme.breakpoints.down('xs')]: {
            margin: 0,
            padding: 0,
            width: '100%',
            backgroundColor: 'transparent',
        },
    },
    loginContent: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 382,
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: 'initial',
        backgroundPositionX: 'center',
        //    background: `${theme.palette.secondary.light} url(${config.settings.loginCover})`
    },
    loginSide: {
        maxWidth: 260,
        minWidth: 260
    },
    sideTitle: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 300
    },
    sideBody: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 300
    },
    sideContain: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    sideButton: {
        border: '1px solid rgba(255, 255, 255, 0.72)',
        color: 'rgba(255, 255, 255, 0.87)'
    },
    colorCover: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#3366ff'
    },
    centerRoot: {
        maxWidth: 1240,
        height: 519,
        width: '100%',
        margin: '0 auto',
        padding: '0 20px',
        [theme.breakpoints.down('xs')]: {
            margin: 0,
            padding: 0,
            height: 330
        }
    },
    centerContainer: {
        display: 'flex',
        margin: '0 auto',
        boxShadow: ' 0 20px 40px rgba(0,0,0,.1)',
        textAlign: 'center',
        borderRadius: 5,
        width: 435,
        overflow: 'hidden',
        [theme.breakpoints.down('xs')]: {
            boxShadow: 'unset',
            margin: 0,
            padding: 0,
            width: '100% !important',
            borderRadius: 0
        },
        [theme.breakpoints.down('sm')]: {
            width: 435
        }
    }
})