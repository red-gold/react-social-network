// - Import react components
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Img from 'components/img';
import React, { Component } from 'react';

import { IPostPhotoGridProps } from './IPostPhotoGridProps';
import { IPostPhotoGridState } from './IPostPhotoGridState';
import { postPhotoGridStyles } from './postPhotoGridStyles';

// - Material UI
/**
 * Create component class
 */
export class PostPhotoGridComponent extends Component<IPostPhotoGridProps, IPostPhotoGridState> {

  /**
   * Component constructor
   */
  constructor(props: IPostPhotoGridProps) {
    super(props)

    // Defaul state

    this.state = {
    }

    // Binding functions to `this`
  }

  /**
   * Handle image click
   */
  handleClick = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    const { onClick } = this.props
    if (onClick) {
      onClick(event, index)
    }
  }

  getData() {
    const { classes, images } = this.props
    const photoDisplay = Math.floor(Math.random() * 2 + 1)
    if (images.length > 1) {
      return (
        <div className={classes.container}>
          <div className={classNames({ [classes.firstColumn]: photoDisplay === 1 }, { [classes.firstRow]: photoDisplay === 2 })}>
            <CardMedia image={images[0].url} onClick={(event) => this.handleClick(event, 0)} className={classNames(classes.mediaCard, classes.featureCard)} />
          </div>
          <div className={classNames({ [classes.column]: photoDisplay === 1 }, { [classes.row]: photoDisplay === 2 })}>
            {images.map((item, index) => {
              if (index !== 0) {
                return <CardMedia key={item.id} onClick={(event) => this.handleClick(event, index)} image={item.url} className={classes.mediaCard} />
              } return ''
            })}
          </div>
        </div>
      )
    }
    return (
      <Img fileName={images[0].url} onClick={(event) => this.handleClick(event, 0)} />

    )
  }
  render() {
    const { classes } = this.props
    return <div className={classes.mainContainer}>{this.getData()}</div>
  }

}

// - Connect component to redux store
export default withStyles(postPhotoGridStyles as any)(PostPhotoGridComponent as any)
