
export const notificationSettingStyles = (theme: any) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
      },
      notification: {
        [theme.breakpoints.down('xs')]: {
           marginTop: 25
          }
      },
      headerCaption: {
          marginLeft: 10
      }
})