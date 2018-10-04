export const postPageStyles = (theme: any) => ({
    root: {
        position: 'relative'
      },
      container: {
        maxWidth: 1200,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        lineHeight: 0,
        position: 'relative',
        boxPack: 'center',
        WebkitJustifyContent: 'center',
        justifyContent: 'center',
        display: 'flex',
        margin: '0 auto',
        width: '100%',
        ['@media (min-width: 440px)']: {
          width: '90%'
        },
        ['@media only screen and (min-width: 860px)']: {
          width: '90%'
        },
        ['@media (min-width: 1600px)']: {
          width: '94%'
        },
        ['@media (max-width: 440px)']: {
          width: 'calc(100% - 16px)',
          margin: '0 8px'
        },
      },
      postBox: {
        flexGrow: 1,
        WebkitBoxFlex: 1,
        flex: '0 1 auto',
        maxWidth: 530,
        minWidth: 140,
        width: '100%',
        display: 'inline-block',
        verticalAlign: 'top',
        textAlign: 'left',
        whiteSpace: 'normal',
        lineHeight: 'normal',
        ['& + &']: {
          marginLeft: 24
        }
      },
      spaceBox: {
        height: 24
      },
    gridCell: {
        [theme.breakpoints.down('sm')]: {

            maxWidth: '100% !important',
            width: '100%'
        }
    }
})