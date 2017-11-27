import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Container, Row, Column } from 'nav-frontend-grid';

import store from './redux';
import routes from './util/routing/routes';

const root = document.getElementById('app');
render(
    <Provider store={store}>
        <Container fluid>
            <Row>
                <Column xs="4" />
                <Column xs="4">
                    <Router>
                        <div>
                            {routes()}
                        </div>
                    </Router>
                </Column>
                <Column xs="4" />
            </Row>
        </Container>
    </Provider>,
    root
);
