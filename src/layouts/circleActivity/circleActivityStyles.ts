export const circleActivityStyles = (theme: any) => ({
    progressContainer: {
        position: 'relative',
        width: 122,
        height: 127,
        margin: 'auto',
    },
    progress: {
        position: 'absolute',
        left: '0',
        bottom: '0',
    },
    circle: {
        color: theme.palette.primary.light,
    },
    textProgress: {
        position: 'absolute',
        textAlign: 'center',
        left: 25,
        width: 72,
        bottom: 26,
        height: 63
    },
    guideline: {
        paddingTop: '3px',
        textAlign: 'center',
    },
})