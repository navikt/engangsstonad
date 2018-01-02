import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container, Row, Column } from 'nav-frontend-grid';
import { IntlProvider } from 'react-intl';

import renderTopLevelRoutes from 'util/routing';
import routeConfig from 'util/routing/routes.config';
import store from './redux';

const root = document.getElementById('app');
render(
    <Provider store={store}>
        <Container fluid>
            <Row>
                <Column md="4" xs="12" />
                <Column md="4" xs="12">
                    <Router>
                        <div className="app">
                            <IntlProvider locale="nb">
                                <Switch>
                                    {renderTopLevelRoutes(routeConfig)}
                                </Switch>
                            </IntlProvider>
                        </div>
                    </Router>
                </Column>
                <Column md="4" xs="12" />
            </Row>
        </Container>
    </Provider>,
    root
);
