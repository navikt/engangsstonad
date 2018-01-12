import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import renderTopLevelRoutes from './util/routing';
import routeConfig from './util/routing/routes.config';
import store from './redux';

const root = document.getElementById('app');
render(
	<Provider store={store}>
		<Router>
			<div className="app">
				<Switch>{renderTopLevelRoutes(routeConfig)}</Switch>
			</div>
		</Router>
	</Provider>,
	root
);
