export const bountiesDialogStyles = (theme: any) => ({
    appBar: {
        position: 'relative',
        backgroundColor: theme.palette.secondary.light,
    },
    iconClose: {
        position: 'absolute',
        right: 20,
        top: 5,
    },
    gridContainer: {
        padding: 20,
        marginBottom: 40,
        maxHeight: 400,
        overflowY: 'auto',
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
    dialogTitle: {
        color: 'white'
    }
})