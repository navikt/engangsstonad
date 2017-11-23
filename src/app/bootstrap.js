import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux';
import routes from './util/routing/routes';

const root = document.getElementById('app');
render(
    <Provider store={store}>
        <Router>
            <div>
                {routes()}
            </div>
        </Router>
    </Provider>,
    root
);
