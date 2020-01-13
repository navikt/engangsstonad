import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
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

if (process.env.NODE_ENV !== 'development') {
    Sentry.init({
        dsn: 'https://e2de35941445465aae1e83fcbcc2934d@sentry.gc.nav.no/8',
        release: (window as any).APP_VERSION,
        environment: window.location.hostname,
        integrations: [new Sentry.Integrations.Breadcrumbs({ console: false })]
    });
}

const root = document.getElementById('app');
render(
    <ErrorBoundary>
        <Provider store={store}>
            <IntlProvider>
                <Router>
                    <Normaltekst tag="div">
                        <AppContainer />
                    </Normaltekst>
                </Router>
            </IntlProvider>
        </Provider>
    </ErrorBoundary>,
    root
);
