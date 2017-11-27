import React from 'react';
import { Route as ReactRoute } from 'react-router-dom';

export const RouteWithSubRoutes = (route) => (
    <ReactRoute
        path={route.path}
        exact={route.exact}
        render={(props) => (<route.component {...props} routes={route.routes} />)}
        key={route.path}
    />
);


export const Route = (route) => (
    <ReactRoute
        exact={route.exact}
        path={route.path}
        render={route.component}
    />
);
