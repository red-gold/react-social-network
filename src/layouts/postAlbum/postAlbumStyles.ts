export const postAlbumStyles = (theme: any) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  subheader: {
    width: '100%',
  },
  descRoot: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  topGradiant: {
    background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.6))',
    height: 32
  },
  shadow: {
    backgroundColor: 'rgba(0,0,0,.6)',
    padding: 24,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  albumTitle: {
    color: 'white'
  },
  noDisplay: {
    display: 'none'
  },
  noAlbum: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAlbumIcon: {
    fontSize: 50
  },
  aboveContainer: {
    background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.6))',
    height: 30,
  },
  bottomContainer: {
    backgroundColor: 'rgba(0,0,0,.6)',
    height: 70,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 1,
    right: 1,
    height: 100,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 400,
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
})