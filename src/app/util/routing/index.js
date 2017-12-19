import React from 'react';

import RouteWithSubRoutes from './route.component';
import defaultRouteConfig from './routes.config';

export default (routeConfig = defaultRouteConfig) => (
    routeConfig.map((route) => (
        <RouteWithSubRoutes
            {...route}
            key={route.path}
        />
    ))
);
