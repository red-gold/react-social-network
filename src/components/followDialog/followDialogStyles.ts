
export const followDialogStyles = (theme: any) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    paper: {
        height: 254,
        width: 243,
        margin: 10,
        textAlign: 'center',
        minWidth: 230,
        maxWidth: '257px'
    },
    dialogContent: {
        paddingTop: '5px',
        padding: '0px 5px 5px 5px'
    },
    circleName: {
        fontSize: '1rem'
    },
    space: {
        height: 20
    },
    fullPageXs: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            height: '100%',
            margin: 0,
            overflowY: 'auto'
        }
    },
    followButton: {
        position: 'absolute',
        bottom: '30px',
        left: 0,
        right: 0
    },
    dialog: {
        width: '',
        maxWidth: '280px',
        borderRadius: '4px'
    }
})