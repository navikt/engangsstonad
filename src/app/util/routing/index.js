import React from 'react';

import RouteWithSubRoutes from './route.component';
import defaultRouteConfig from './routes.config';

const renderRoutes = (routeConfig = defaultRouteConfig) =>
    routeConfig.map((route) => (
        <RouteWithSubRoutes
            {...route}
            key={`${route.path}-${route.subpath || ''}`}
        />
    ));

export default renderRoutes;
