// Import external components refrence
import 'reflect-metadata';
import './socialEngine';
import './styles/app.css';
import 'locales/i18n';
import 'typeface-roboto';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { socialTheme } from 'config/socialTheme';
import { ConnectedRouter } from 'connected-react-router/immutable';
import Master from 'containers/master';
import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as authorizeActions from 'store/actions/authorizeActions';
import * as globalActions from 'store/actions/globalActions';
import configureStore from 'store/configureStore';
import rootSaga from 'store/sagas/rootSaga';

import i18n from './locales/i18n';
import registerServiceWorker from './registerServiceWorker';

// import 'moment/locale/es'
// - Actions
// - Import app components
// import { App } from 'components/AWS'
// App css
/**
 * Execute startup functions
 */
configureStore.runSaga(rootSaga)

// Set default data
// tslint:disable-next-line:no-empty
configureStore.store.subscribe(() => { })

// - Initialize languages
configureStore.store.dispatch(authorizeActions.subcribeAuthorizeStateChange())
configureStore.store.dispatch(globalActions.initLocale())
// Needed for onClick
// http://stackoverflow.com/a/34015469/988941
try { injectTapEventPlugin() } catch (e) { }

const theme = createMuiTheme(socialTheme)

ReactDOM.render(
	<Provider store={configureStore.store}>
	<I18nextProvider
				i18n={i18n}
			>
		<ConnectedRouter history={configureStore.history}>
			<MuiThemeProvider theme={theme}>
				<Master />
			</MuiThemeProvider>
		</ConnectedRouter>
		</I18nextProvider>
	</Provider>,
	document.getElementById('app') as HTMLElement
)
registerServiceWorker()
