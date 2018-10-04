export const pictureDialogStyles = (theme: any) => ({
    container: {
        margin: 'auto',
        display: 'block',
        width: '80%',
        maxWidth: 700,
    },
    close: {
        position: 'absolute',
        top: 15,
        right: 35,
        transition: '0.3s',
    },
    closeIcon: {
        color: 'white'
    },
    root: {
        paddingTop: 100
    },
    iosDialog: {overflow: 'auto', WebkitOverflowScrolling: 'touch', width: '100%', height: '100%'}
})