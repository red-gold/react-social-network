export const chatBodyStyles = (theme: any) => ({
    root: {
        position: 'fixed',
        right: 30,
        bottom: 30,
        left: 'unset !important',
        zIndex: 1100,
        height: '400px',
        width: '600px',
        overflow: 'hidden',
        borderRadius: 5,
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        MsUserSelect: 'none',
        userSelect: 'none',
        outline: 0
    },
    rootMinimized: {
        height: '44px'
    },
    oneColumn: {
        width: '300px',
    },
    primaryText: {
        fontSize: '12px !important',
        color: 'rgba(255, 255, 255, 0.87) !important',
        fontWeight: 300
    },
    secondaryText: {
        color: '#c1b7f59e',
        fontSize: 10,
        fontWeight: 300
    },
    receiverSecondaryText: {
        color: '#989898c9',
    },
    moreMenu: {
        color: 'rgb(255, 255, 255)'
    },
    moreMenuIcon: {
        fontSize: 20
    },
    receiverMoreIcon: {
        fontSize: 20,
        color: '#989898c9',
    },
    userItem: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        paddingBottom: 4,
    },
    receiverUserItem: {
        backgroundColor: theme.palette.primary.main
    },
    searchInput: {
        fontSize: '10px !important',
        color: 'rgb(200, 188, 255) !important'
    },
    searchField: {
        margin: '13px 0px'
    },
    searchIcon: {
        fontSize: 15,
        color: 'white'
    },
    sendIcon: {
        color: '#989898'
    },
    emojiIcon: {
        fontSize: 15,
        color: '#989898c9',
        cursor: 'pointer',
        '&:hover': {
            color: '#828181'
        }
    },
    receiverUserRoot: {
        flex: '1 1 auto',
        padding: '0 25px 0 0',
        minWidth: 0,
        textAlign: 'center'
    },
    bodyMessageRoot: {
        padding: '20px 0px',
        backgroundColor: '#F9F6F6',
        height: 'calc(100% - 110px)',
        overflowY: 'auto',
        overflowX: 'hidden'
    },
    messageRoot: {
        display: 'flex',
        flexDirection: 'row',
        padding: '0px 10px',
        marginBottom: 10

    },
    messageRootRight: {
        display: 'flex',
        flexDirection: 'row-reverse',
        padding: '0px 10px'
    },
    messageAvatar: {
        border: '1px solid #ffffff8c',
        borderRadius: '50%'
    },
    messageText: {
        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.14)',
        padding: '10px 6px',
        borderRadius: '8px',
        backgroundColor: 'white',
        margin: '0px 10px'
    },
    listContainer: {
        paddingTop: 0,
        height: '100%'
    },
    rightSideChatRoot: {
        backgroundColor: '#F9F6F6',
        padding: '0 0 !important'
    },
    leftSideChatRoot: {
        backgroundColor: '#4F4484',
        padding: '0 0px !important',
        [theme.breakpoints.only('xs')]: {
            display: 'none'
        }
    },
    activeUserItem: {
        borderRight: '4px solid',
        boderColor: theme.palette.primary.main,
        backgroundColor: 'rgba(0, 0, 0, 0.08)'
    },
    messageTextRight: {
        backgroundColor: theme.palette.primary.main
    },
    sendMessageRoot: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F9F6F6',
        width: '100%',
        bottom: 0,
        position: 'absolute',
        padding: '10px 0px'
    },
    messageField: {
        margin: '0px 1px 0px 16px',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: '3px 10px'
    },
    messageInput: {
        fontSize: 13,
        fontWeight: 300
    },
    paperEmoji: {
        width: 300,
        height: 270,
        outline: 'none',
        position: 'absolute',
        minWidth: '16px',
        maxWidth: 'calc(100% - 32px)',
        overflowY: 'auto',
        overflowX: 'hidden',
        minHeight: '16px',
        maxHeight: 'calc(100% - 32px)',
    },
    fullPageEmojiXs: {
        [theme.breakpoints.down('xs')]: {
            // width: '100%',
            // height: '100%',
            margin: 0,
            overflowY: 'auto',
            maxHeight: '100%',
            maxWidth: '100%',
            // top: '0 !important',
            // left: '0 !important',
            // position: 'fixed',
            borderRadius: 0,
        }
    },
    container: {
        margin: 0,
        width: '100% !important',
        height: '100% !important'
    },
    fullPageXs: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            height: '100%',
            margin: 0,
            overflowY: 'auto',
            maxHeight: '100%',
            maxWidth: '100%',
            top: '0 !important',
            left: '0 !important',
            position: 'fixed',
            borderRadius: 0
        }
    },
    noDisplay: {
        display: 'none'
    },
    header: {
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    menuItem: {
        fontSize: 12,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: 'center'

    },

})