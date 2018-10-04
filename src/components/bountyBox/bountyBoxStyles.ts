export const bountyBoxStyles = (theme: any) => ({
    paper: theme.mixins.gutters({
        padding: 20,
        height: 160,
        position: 'relative', 
        width: '100%',
        minWidth: 200,
    }),
   
    bigAvatar: {
        width: 30,
        height: 30,
    },
    cardHeader: {
        padding: '15px 0px 0px 0px',
        position: 'absolute',
        bottom: 15, 
        left: 30,
    },
    text: {
        fontSize: ' 0.750rem',
    }
})