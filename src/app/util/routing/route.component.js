import React from 'react';
import { Route as ReactRoute } from 'react-router-dom';

const RouteWithSubRoutes = (route) => (
    <ReactRoute
        path={route.path}
        exact={route.exact}
        render={(props) => (<route.component {...props} routes={route.routes} key={route.path} />)}
        key={route.path}
    />
);

export default RouteWithSubRoutes;
