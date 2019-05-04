// - Import react components
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import config from 'src/config';

import { footerStyles } from './footerStyles';
import { IFooterComponentProps } from './IFooterComponentProps';
import { IFooterComponentState } from './IFooterComponentState';

// - Material-UI
/**
 * Create component class
 */
export class FooterComponent extends Component<IFooterComponentProps, IFooterComponentState> {

  /**
   * Component constructor
   *
   */
  constructor(props: IFooterComponentProps) {
    super(props)

    // Defaul state
    this.state = {
    }

    // Binding functions to `this`

  }

  /**
   * Reneder component DOM
   * 
   */
  render() {
    const { classes, t } = this.props

    return (

      <div className={classes.root}>
        {/* {CommonAPI.isMobile() ? <div style={{height: 90}}></div> : mobileElement} */}

        <div className={classes.content}>
          <Grid item xs={12} sm={9} md={9} lg={9}>
            <nav className={classes.nav}>
              <ul className={classes.list}>

                <li className={classes.item}>
                  <NavLink
                    to={`/terms`}
                  >
                    {t!('terms.privacyTitle')}
                  </NavLink>
                </li>
                <li className={classes.item}>
                  <a href={`mailto:${config.settings.supportEmail}?Subject=Hola`} target='_top'>{t!('footer.supportEmail')}</a>
                </li>
              </ul>
            </nav>
          </Grid>
          <span className={classes.companyName}>© {(new Date()).getFullYear()} {config.settings.companyName}</span>
        </div>
      </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IFooterComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 */
const mapStateToProps = () => {
  return {

  }
}

const translateWrraper = withTranslation('translations')(FooterComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(footerStyles as any)(translateWrraper as any) as any)