// @flow
import React from 'react';

import Logo from './../shared/logo/Logo';
import RouteWithSubRoutes from './../../util/routing/routes.component';

type Props = {
    routes: Array<any>
}

const EngangsstonadIndex = (props: Props) => ([
    <Logo />,
    props.routes && props.routes.map((route) => (<RouteWithSubRoutes {...route} />))
]);

export default EngangsstonadIndex;
