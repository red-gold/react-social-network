import { green } from '@material-ui/core/colors'

export const signupStyles = (theme: any) => ({
    root: {
      padding: '20px 40px 36px',
      [theme.breakpoints.down('xs')]: {
        padding: '0px 40px 36px'
  
      },
    },
    textField: {
      minWidth: 280,
      marginTop: 20
  
    },
    contain: {
      margin: '0 auto',
      marginTop: 50
    },
    paper: {
      minHeight: 370,
      maxWidth: 450,
      minWidth: 337,
      textAlign: 'center',
      display: 'block',
      margin: 'auto'
    },
    caption: {
      marginTop: 30,
      marginBottom: 15
    },
    logo: {
      height: 60
    },
    link: {
      color: theme.palette.primary.main,
      display: 'inline-block'
    },
    bottomPaper: {
      display: 'inherit',
      fontSize: 'small',
      marginTop: 15,
      marginBottom: 15
    },
    signupButton: {
      maxWidth: 280,
      minWidth: 280,
    },
    signupButtonRoot: {
      margin: 0,
      border: 0,
      display: 'inline-flex',
      padding: 0,
      position: 'relative',
      minWidth: 0,
      flexDirection: 'column',
    },
    wrapperButton: {
      position: 'relative',
      width: '100%',
      maxWidth: 280,
      minWidth: 280,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      },
  })