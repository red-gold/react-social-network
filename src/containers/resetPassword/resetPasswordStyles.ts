import { green } from "@material-ui/core/colors"

export const resetPasswordStyles = (theme: any) => ({
    textField: {
      minWidth: 280,
      marginTop: 20
  
    },
    wrapper: {
      margin: theme.spacing.unit,
      position: 'relative',
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    caption: {
      marginTop: 30
    },
    formControl: {
      minWidth: 280
    },
    noDisplay: {
      display: 'none'
    },
    loading: {
      position: 'absolute',
      top: '45%',
      left: '45%'
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
    logo: {
      height: 50,
      marginBottom: 30
    },
    boxRoot: {
      padding: '20px 40px 36px'
    },
    backButton: {
      margin: 8
    }
  })
  