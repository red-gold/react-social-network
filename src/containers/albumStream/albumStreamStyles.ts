
export const albumStreamStyles = (theme: any) => ({
    icon: {
        color: 'rgba(255, 255, 255, 0.72)'
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    noAlbumIcon: {
        fontSize: 50
    },
    noAlbum: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridList: {
        overflow: 'unset',
        margin: '0 !important'
    }
})