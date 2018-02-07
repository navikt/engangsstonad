import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import EngangsstonadIndex from 'components/engangsstonad/EngangsstonadIndex';
import IntlProvider from './../app/components/intl/IntlProvider';
import store from './redux';

const root = document.getElementById('app');
render(
	<Provider store={store}>
		<IntlProvider>
			<Router>
				<div className="app">
					<EngangsstonadIndex />
				</div>
			</Router>
		</IntlProvider>
	</Provider>,
	root
);
