import React from 'react';

import RouteWithSubRoutes from './route.component';
import routeConfig from './routes.config';

const routes = () => routeConfig.map((route) => (<RouteWithSubRoutes {...route} key={route.path} />));

export default routes;
