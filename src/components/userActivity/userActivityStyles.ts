
export const userActivityStyles = (theme: any) => ({
    paper: theme.mixins.gutters({
        maxWith: 900,
        minWidth: 346,
        margin: '30px auto',
        padding: 20,
    }),
    userAvatar: {
        padding: 0,
        margin: 'auto',
        fontSize: 60
    },
    userNameText: {
        textAlign: 'center',
        padding: 20,
    },
    paperContainer: {
        height: '100%',
        position: 'relative',
    },
    impactIcon: {
        fontSize: 20
    },
    paperBackground: {
        padding: '17px 12px 15px 15px',
        backgroundColor: 'white',
    },
    paperBackground1: {
        backgroundColor: theme.palette.secondary.light,
    },
    title: {
        fontSize: 16,
        padding: 8,
        fontWeight: 400,
        backgroundColor: theme.palette.secondary.light,
        color: 'white'
    },
    titleSpecial: {
        color: 'white',
    },
    repText: {
        color: 'white',
        fontSize: 90,
        textAlign: 'center',
        verticalAlign: 'middle',
        paddingTop: 30,
        wordSpacing: -30,
        cursor: 'pointer'
    },
    listItem: {
        padding: '8px 0px 4px 12px',
    },
    repLabel: {
        marginTop: 50,
        textAlign: 'center',
        color: 'white'
    },
    repCaption: {
        fontSize: 20, 
        cursor: 'pointer'
    },
    diamond: {
        marginLeft: 5
    },
    facebookIcon: {
        marginLeft: 5,
        width: 30
    },
    twitterIcon: {
        marginLeft: 5,
        width: 30
    },
    content: {
        padding: '15px 15px 1px 15px',
    },
    buttonBounties: {
        minWidth: 0,
        minHeight: 0,
        textTransform: 'capitalize',
        padding: 0,
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: '1.375em',
        display: 'block',
    },
    card: {
        visibility: 'hidden',
        overflow: 'hidden',
        position: 'absolute',
        WebkitTransition: 'all .218s cubic-bezier(0.4,0.0,0.2,1)',
        transition: 'all .218s cubic-bezier(0.4,0.0,0.2,1)',
        margin: '5px',
        boxShadow: '0 2px 11px rgba(0,0,0,0.2)'
    },
    container: {
        top: '-61px',
        position: 'relative',
        WebkitTransition: 'all .218s cubic-bezier(0.4,0.0,0.2,1)',
        transition: 'all .218s cubic-bezier(0.4,0.0,0.2,1)',
    },
    editButtonContainer: {
        textAlign: 'center'
    },
    allPrivileges: {
        
    },
    allPrivilegesButton: {
        fontSize: '0.715rem'
    },
    borderAnimation: {
      WebkitAnimation: 'pulse-shadow--collection 2s infinite',
      animation: 'pulse-shadow--collection 2s infinite',
      borderColor: '#03a87c',
      color: '#03a87c',
      fill: '#03a87c'
    },
    facebookIconRoot: {
        width: 35,
        height: 35
    },
    twitterIconRoot: {
        width: 35,
        height: 35
    },
    disableComponent: {
        opacity:'0.2',  
        'pointer-events': 'none'
    }
})