
export const chatRoomSettingStyles = (theme: any) => ({
  fullPageXs: {
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
  rightSideChatRoot: {
    backgroundColor: '#F9F6F6',
    padding: '0 0 !important'
  },
  noDisplay: {
    display: 'none'
  },
  listContainer: {
    paddingTop: 0,
    height: '100%'
  },
  userItem: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 4,
  },
  receiverUserItem: {
    backgroundColor: theme.palette.primary.main
  },
  header: {
    color: 'white',
    marginLeft: 5
  },
  backIcon: {
    color: 'white',
    // width: 30,
    // height: 30
  },
  settingItem: {
    padding: 10
  },
  settingBox: {
    overflow: 'hidden',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
  },
  settingMenu: {
    marginTop: 5,
    padding: '7px 5px',
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f5f6f7'
    }
  },
  itemIcon: {
    width: 15,
    height: 15,
    fontSize: 20,
    marginRight: 10
  },
  dropdown: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
    textAlign: 'center',
    overflowY: 'auto',
    backgroundColor: '#f1f1f1',
    maxHeight: '91%'
  },
  dropdownItem: {
    display: 'block',
    color: '#000',
    padding: '8px 16px',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '#555',
      color: 'white'
    }
  },
  dropdownActive: {
    backgroundColor: '#555',
    color: 'white'
  },
  dropdownClose: {
    backgroundColor: 'white',
    color: '#555'
  },
  dropdownCaption: {
    color: 'inherit'
  },
  settingMenuLabel: {
    display: 'flex'
  }
})
