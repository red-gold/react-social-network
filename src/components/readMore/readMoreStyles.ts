
export const readMoreStyles = (theme: any) => ({
  root: {
    position: 'relative'
  },
  expanded: {
    // overflow: 'hidden',
    // maxHeight: 173,
    '&:before': {
      content: '',
      float: 'left',
      width: 5,
      height: '100%',
    },
    '&:after': {
      content: '"\\002026"',
      fontSize: 34,
      fontWeight: 500,
      color: '#4285f4',
      boxSizing: 'content-box',
      float: 'right',
      position: 'absolute',
      top: 150,
      left: '100%',
      height: 20,
      width: '2em',
      marginLeft: '-2em',
      paddingRight: 5,
      textAlign: 'right',
      background: 'linear-gradient(to right,rgba(255,255,255,0),white 50%,white)',
      cursor: 'pointer'
    }
  }
})