export const ribbonStyles = (theme: any) => ({
    ribbon: {
        display: 'block',
        color: '#fff',
        position: 'absolute',
        fontSize: 11,
        right: 0,
        top: 10,
        backgroundColor: '#14c4f2',
        margin: '-5px -14px 19px -35px',
        padding: '4px 22px 4px 5px',
        WebkitBoxShadow: '-2px 2px 3px 0px rgba(0,0,0,0.4)',
        MozBoxShadow: '-2px 2px 3px 0px rgba(0,0,0,0.4)',
        boxShadow: '-2px 2px 3px 0px rgba(0,0,0,0.4)',
        '&:after': {
          left: 'auto',
          right: '0',
          width: '0',
          bottom: '-14px',
          opacity: '0.7',
          display: 'block',
          content: '""',
          position: 'absolute',
          borderTop: '14px solid #0c92b5',
          borderRight: '14px solid transparent'
        }
      },
    smallRibbon: {
        display: 'block',
        color: '#fff',
        fontSize: 11,
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#14c4f2',
        padding: 2,
      },
      icon: {
        fontSize: 15,
        position: 'absolute'
      },
      label: {
        marginLeft: 26,
        lineHeight: '16px'
      },
      smallLabel: {
        marginLeft: 17,
        lineHeight: '16px',
        wordSpacing: '-3px',
      }
})