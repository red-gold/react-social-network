// Import external components refrence
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import 'reflect-metadata'
import 'typeface-roboto'
import registerServiceWorker from './registerServiceWorker'

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
try { injectTapEventPlugin() } catch (e) {}

const theme = createMuiTheme({
  palette: {
	  primary: { main: '#00b1b3' },
	  secondary: { main: '#4d545d' }
  }
})
// App css
import './styles/app.css'

/**
 * Execute startup functions
 */
import './socialEngine'

const supportsHistory = 'pushState' in window.history
ReactDOM.render(
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<MuiThemeProvider theme={theme}>
						<Master />
					</MuiThemeProvider>
				</ConnectedRouter>
			</Provider>,
	document.getElementById('app') as HTMLElement
  )
registerServiceWorker()
