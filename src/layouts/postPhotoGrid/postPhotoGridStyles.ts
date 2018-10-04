export const postPhotoGridStyles = (theme: any) => ({
  mainContainer: {
    width: '100%'
},
container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 20,
    width: '100%',
    height: 415,
    position: 'relative',
},
firstRow: {
    flex: '100%',
    display: 'flex',
    paddingBottom: 1
},
row: {
    flex: '100%',
    display: 'flex',
    marginTop: 1,
    marginBottom: 1,
},
firstColumn: {
    flex: '50%',
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 1
},
column: {
    flex: '50%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 1,
    paddingRight: 2,
},
mediaCard: {
    height: '100%',
    width: '100%',
    backgroundSize: 'cover',
    margin: 1,
},

})