// Import external components refrence
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { cyan500 } from 'material-ui/styles/colors'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import 'reflect-metadata'

import { Provider } from 'react-redux'
import store, { history } from 'store/configureStore'
import { ConnectedRouter } from 'react-router-redux'

// - Import app components
import Master from 'components/master'
// import { App } from 'components/AWS'

// Set default data
// tslint:disable-next-line:no-empty
store.subscribe(() => { })

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
try { injectTapEventPlugin() } catch (e) { }

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: 'rgb(199, 212, 0)'
  },
  // raisedButton: {
  //   primaryColor: 'rgb(199, 212, 0)' // Raised button background color
  // },
  // flatButton: {
  //   primaryTextColor: 'rgb(199, 212, 0)' // Flat button background color
  // },
  // tabs: {
  //   backgroundColor: 'rgb(199, 212, 0)' // Tabs backgound color
  // },
  toolbar: {
	  backgroundColor: '#6d9828' // Backgroung color of header in toolbar
  }
})

// App css
import 'applicationStyles'

/**
 * Execute startup functions
 */
import './socialEngine'

const supportsHistory = 'pushState' in window.history
const render = (Component: any) => {
	 ReactDOM.render(
		<AppContainer warnings={false}>
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<MuiThemeProvider muiTheme={muiTheme}>
						<Component />
					</MuiThemeProvider>
				</ConnectedRouter>
			</Provider>
		</AppContainer>,
		document.getElementById('app')
	)
}

render(Master)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept()
}
