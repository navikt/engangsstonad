

import React from 'react';
import { Route as ReactRoute } from 'react-router-dom';
import routeConfig from './routes.config';


const Route = (route) => (
    <ReactRoute
        exact={route.exact}
        path={route.path}
        title={route.title}
        render={route.component}
    />
);

const routes = () => routeConfig.map((route) => (<Route {...route} />));

export default routes;
