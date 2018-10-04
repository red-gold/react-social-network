export const timelineStyles = (theme: any) => ({
    appBar: {
        position: 'relative',
      },
      doneIcon: {
        color: 'green'
      },
      flex: {
        flex: 1,
      },
      paper: theme.mixins.gutters({
        maxWidth: 670,
        minWidth: 350,
        margin: '30px auto',
        padding: 20,
    }),
    table: {
        marginTop: 10,
        marginBottom: 10
    },
    cell: {
        border: 'none',
        '&:nth-of-type(even)': {
            fontWeight: 'bold',
        },
        padding: '4px 1px 3px 20px'        
    },
    row: {
        '&:hover': {
            backgroundColor: theme.palette.background.default,
            cursor: 'pointer',
        },
    },
    activeColor: {
        color: 'rgb(202, 204, 206)',
    },
    notactiveColor: {
        color: theme.palette.secondary.main,
    },
    description: {
        maxWidth: 1080,
        margin: '0 auto',
        padding: '25px',
        marginTop: '15px',
        marginBottom: '55px',
        backgroundColor: '#ece8b24a',
        border: '1px solid #d4d4d4',
        borderRadius: '2px',
    }
})