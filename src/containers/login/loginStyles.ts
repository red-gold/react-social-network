import green from '@material-ui/core/colors/green'

export const loginStyles = (theme: any) => ({
  textField: {
    minWidth: 280,
    marginTop: 20

  },
  root: {
    padding: '48px 40px 36px',
    [theme.breakpoints.down('xs')]: {
      padding: '0px 40px 36px'

    },
  },
  contain: {
    margin: '0 auto',
    marginTop: 50
  },
  paper: {
    textAlign: 'center',
    display: 'block',
    margin: 'auto'
  },
  bottomPaper: {
    display: 'inherit',
    fontSize: 'small',
    marginTop: '25px',
    marginBottom: 15
  },
  link: {
    color: theme.palette.primary.main,
    display: 'inline-block'
  },
  logo: {
    height: 60
  },
  wrapperButton: {
    position: 'relative',
    width: '100%',
    maxWidth: 280,
    minWidth: 280,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  title: {
    fontSize: 30,
    fontWeight: 300,
    marginTop: '-19px',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
  },
},
    forgotText: {
      fontSize: 11
    }
})