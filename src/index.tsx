// Import external components refrence
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import 'reflect-metadata'
import 'typeface-roboto'

import { Provider } from 'react-redux'
import store, { history } from 'store/configureStore'
import { ConnectedRouter } from 'react-router-redux'

// - Import app components
import Master from 'components/master'
// import { App } from 'components/AWS'

// Set default data
// tslint:disable-next-line:no-empty
store.subscribe(() => { })

// Needed for onClick
// http://stackoverflow.com/a/34015469/988941
try { injectTapEventPlugin() } catch (e) { }

const theme = createMuiTheme({
  palette: {
	  primary: { main: '#00b1b3' },
	  secondary: { main: '#4d545d' }
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
					<MuiThemeProvider theme={theme}>
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
