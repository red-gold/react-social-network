// - Import react components
import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { grey200, grey400, grey600 } from 'material-ui/styles/colors'


    /**
       * DOM styles
       * 
       * 
       * @memberof Post
       */
    const styles = {
      iconButton: {
        width: 24,
        height: 24

      }

    }


const IconButtonElement = (
      <IconButton style={styles.iconButton} iconStyle={styles.iconButton}
        touch={true}
      >
        <MoreVertIcon color={grey400} viewBox='9 0 24 24' />
      </IconButton>
    )

    export default IconButtonElement