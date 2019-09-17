import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';

import AppContainer from './containers/AppContainer';
import IntlProvider from './intl/IntlProvider';
import store from './redux/index';

import * as countries from 'i18n-iso-countries';
import ErrorBoundary from './ErrorBoundary';
countries.registerLocale(require('i18n-iso-countries/langs/nb.json'));
countries.registerLocale(require('i18n-iso-countries/langs/nn.json'));
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

const Modal = require('nav-frontend-modal').default;
(Modal as any).setAppElement('#app');

Sentry.init({
    dsn: 'https://733aa29391624d3081906d7bb15d681c@sentry.nav.no/14',
    release: (window as any).APP_VERSION,
    environment: window.location.hostname,
    integrations: [new Sentry.Integrations.Breadcrumbs({ console: false })]
});

const root = document.getElementById('app');
render(
    <ErrorBoundary>
        <Provider store={store}>
            <IntlProvider>
                <Router>
                    <div className="app">
                        <AppContainer />
                    </div>
                </Router>
            </IntlProvider>
        </Provider>
    </ErrorBoundary>,
    root
);
