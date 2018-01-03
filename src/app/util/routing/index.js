import React from "react";

import RouteWithSubRoutes from "./route.component";

export default (routeConfig) =>
	routeConfig.map((route) => (
		<RouteWithSubRoutes {...route} key={route.path || "404"} />
	));
