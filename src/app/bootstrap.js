import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container, Row, Column } from 'nav-frontend-grid';

import store from './redux';
import routes from './util/routing/routes';
import LanguageProvider from './../app/components/language/LanguageProvider';

const root = document.getElementById('app');
render(
    <Provider store={store}>
        <Container fluid>
            <Row>
                <Column md="4" xs="12" />
                <Column md="4" xs="12">
                    <Router>
                        <LanguageProvider>
                            <div className="app">
                                {routes()}
                            </div>
                        </LanguageProvider>
                    </Router>
                </Column>
                <Column md="4" xs="12" />
            </Row>
        </Container>
    </Provider>,
    root
);
