import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Container, Row, Column } from 'nav-frontend-grid';

import store from './redux';
import routes from './util/routing/routes';

const NoDiv = ({ children }) => children;

const root = document.getElementById('app');
render(
    <Provider store={store}>
        <Container fluid>
            <Row>
                <Column md="4" xs="0" />
                <Column md="4" xs="12">
                    <Router>
                        <NoDiv>
                            {routes()}
                        </NoDiv>
                    </Router>
                </Column>
                <Column md="4" xs="0" />
            </Row>
        </Container>
    </Provider>,
    root
);
