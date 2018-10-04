
export const photoMasterStyles = (theme: any) => ({
    root: {

    },
    gridCell: {
        [theme.breakpoints.down('sm')]: {

            maxWidth: '100% !important',
            width: '100%'
        }
    },
    noAlbumRoot: {
        maxWidth: 500,
        textAlign: 'center',
        margin: '0 auto',
        minHeight: 150
    },
    noAlbumIcon: {
        color: '#afafaf',
        fontSize: 74
    },
    noAlbumText: {

    }
})