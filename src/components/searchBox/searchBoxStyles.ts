import config from 'src/config'

export const searchBoxStyles = (theme: any) => ({
  root: {
    backgroundColor: '#a5792a'
  },
  flex: {
    flex: 1
  },
  pageTitle: {
    color: theme.palette.common.white,
    borderLeftColor: theme.palette.common.white
  },
  appIcon: {
    width: 40,
    height: 40,
    marginLeft: 10
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: theme.palette.common.white,
    padding: 5,
    borderRadius: 4,
  },
  searchField: {
    marginLeft: 20,
    maxWidth: 720,

  },
  searchIcon: {
    marginLeft: 0,
    marginRight: 9,
  },
  searchButton: {
    color: theme.palette.common.white
  },
  searchItemIcon: {
    width: 18,
    height: 18,
    color: theme.palette.common.black,
  },
  searchList: {
    maxHeight: 384,
    maxWidth: 820,
    top: 47,
    boxSizing: 'border-box',
    padding: '4px 0',
    border: '1px solid rgba(0,0,0,.2)',
    backgroundColor: '#ffffff',
    borderRadius: '0 0 2px 2px',
    boxShadow: '0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2)',
    position: 'absolute',
    right: 0,
    left: 0,
    zIndex: 1,
    outline: 'none',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  searchIconRoot: {
    borderRadius: '50%',
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.white,
    marginRight: 0
  },
  listItem: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 16,
    paddingRight: 16
  },
  searchItemText: {
    fontWeight: 400,
    paddingLeft: 6,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.common.black,
    display: 'block'
  },
  noDisplay: {
    display: 'none'
  }
})
