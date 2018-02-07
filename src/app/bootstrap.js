import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import IntlProvider from './../app/components/intl/IntlProvider';
import renderTopLevelRoutes from './util/routing';
import routeConfig from './util/routing/routes.config';
import store from './redux-ts';

const root = document.getElementById('app');
render(
	<Provider store={store}>
		<IntlProvider>
			<Router>
				<div className="app">
					<Switch>{renderTopLevelRoutes(routeConfig)}</Switch>
				</div>
			</Router>
		</IntlProvider>
	</Provider>,
	root
);
