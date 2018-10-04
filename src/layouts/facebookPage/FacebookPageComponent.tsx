// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { grey } from '@material-ui/core/colors'
import SvgClose from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { IFacebookPageProps } from './IFacebookPageProps'
import { IFacebookPageState } from './IFacebookPageState'

declare const FB: any

/**
 * Create component class
 */
export default class FacebookPageComponent extends Component<IFacebookPageProps,IFacebookPageState> {

  static propTypes = {
    adaptContainerWidth: PropTypes.bool,
    appId: PropTypes.string.isRequired,
    height: PropTypes.number,
    hideCover: PropTypes.bool,
    hideCta: PropTypes.bool,
    href: PropTypes.string.isRequired,
    locale: PropTypes.string,
    showFacepile: PropTypes.bool,
    smallHeader: PropTypes.bool,
    tabs: PropTypes.arrayOf(PropTypes.string),
    version: PropTypes.string,
    width: PropTypes.number,
    xfbml: PropTypes.bool

  }

  static defaultProps = {
    adaptContainerWidth: true,
    locale: 'en_US',
    height: 500,
    hideCover: false,
    hideCta: false,
    showFacepile: true,
    smallHeader: false,
    tabs: ['timeline'],
    version: 'v2.5',
    width: 340,
    xfbml: true
  }

  componentDidMount() {
    const {appId, locale, version, xfbml} = this.props;
    (window as any).fbAsyncInit = () => {
      FB.init({
        appId: appId,
        xfbml: xfbml,
        version: version,
      })
    }

    // Load the SDK asynchronously
    ((d, s, id) => { 
      const element = d.getElementsByTagName(s)[0]
      const fjs = element
      let js: any = element
      if (d.getElementById(id)) {return}
      js = d.createElement(s); js.id = id
      js.src = `//connect.facebook.net/${locale}/sdk.js`
      fjs.parentNode!.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  }

  componentDidUpdate() {
    if ((window as any).FB) {
      (window as any).FB.XFBML.parse()
    }
  }

  render() {
    const {adaptContainerWidth, height, hideCover, hideCta, href, showFacepile, smallHeader, tabs, width} = this.props

    return (
      <span>
        <div id='fb-root'></div>
        <div className='fb-page'
          data-href={href}
          data-width={width}
          data-height={height}
          data-adapt-container-width={adaptContainerWidth}
          data-tabs={tabs ? tabs.join() : null}
          data-hide-cover={hideCover}
          data-show-facepile={showFacepile}
          data-hide-cta={hideCta}
          data-small-header={smallHeader}
          ></div>
      </span>
    )
  }
}
