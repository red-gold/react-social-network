
export const userPermissionStyles = (theme: any) => ({
    fullPageXs: {
        minWidth: 400,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        height: '100%',
        margin: 0,
        overflowY: 'auto'
      }
    },
    dialogTitle: {
      padding: 0
    },
    root: {
        display: 'flex',
      },
      formControl: {
        margin: theme.spacing.unit * 3,
      },
      group: {
        margin: `${theme.spacing.unit}px 0`,
      },
      dialogContent: {
        padding: 0
      },
      dialogAction: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      permissionItem: {
        fontSize: 15
      }
  })