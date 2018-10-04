// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import config from 'src/config'

import { Map } from 'immutable'
import { withStyles } from '@material-ui/core/styles'
import { translate, Trans } from 'react-i18next'

// - Material-UI
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

import { IFooterComponentProps } from './IFooterComponentProps'
import { IFooterComponentState } from './IFooterComponentState'
import { appStoreDownload } from 'locales/appStoreDownload'
import CommonAPI from 'api/CommonAPI'
import { footerStyles } from './footerStyles'

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
    const { classes, t, currentLanguage } = this.props

    const mobileElement = (
      <div className={classes.getAppRoot}>
        <p className={classes.getApp}>{t!('mobileApp.getApp')}</p>
        <div className={classes.getAppIconRoot}>
          <a className={classes.iosAppLink} target='_blank' href={config.settings.iosAppLink}>
            <img className={classes.appStoreIcon} alt={t!('mobileApp.appStoreAlt')} src={appStoreDownload[currentLanguage!]} />
          </a>
          <a target='_blank' href={config.settings.androidAppLink}>
            <img className={classes.googlePlayIcon} alt={t!('mobileApp.googlePlayAlt')} src={t!('mobileApp.googlePlayIcon', { lang: currentLanguage })} />
          </a>
        </div>
      </div>
    )
    return (

      <div className={classes.root}>
        {CommonAPI.isMobile() ? <div style={{height: 90}}></div> : mobileElement}

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
const mapStateToProps = (state: Map<string, any>, ownProps: IFooterComponentProps) => {
  return {

  }
}

const translateWrraper = translate('translations')(FooterComponent)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(footerStyles as any)(translateWrraper as any) as any)