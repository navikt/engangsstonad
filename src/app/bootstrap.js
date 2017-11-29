import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container, Row, Column } from 'nav-frontend-grid';

import ElementWrapper from './util/ElementWrapper';
import store from './redux';
import routes from './util/routing/routes';

const root = document.getElementById('app');
render(
    <Provider store={store}>
        <Container fluid>
            <Row>
                <Column md="4" xs="12" />
                <Column md="4" xs="12">
                    <Router>
                        <ElementWrapper>
                            {routes()}
                        </ElementWrapper>
                    </Router>
                </Column>
                <Column md="4" xs="12" />
            </Row>
        </Container>
    </Provider>,
    root
);
