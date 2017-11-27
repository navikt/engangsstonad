import React from 'react';
import { Route as ReactRoute } from 'react-router-dom';
import routeConfig from './routes.config';

const Route = (route) => (
    <ReactRoute
        exact={route.exact}
        path={route.path}
        render={route.component}
    />
);

const routes = () => routeConfig.map((route) => (<Route {...route} key={route.path} />));

export default routes;
