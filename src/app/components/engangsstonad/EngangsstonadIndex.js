// @flow
import React from 'react';

import NavLogo from './../shared/NavLogo';
import RouteWithSubRoutes from './../../util/routing/routes.component';

type Props = {
    routes: Array<any>
}

export const EngangsstonadIndex = (props: Props) => (
    <div>
        <NavLogo />
        { props.routes && props.routes.map((route) => (<RouteWithSubRoutes {...route} key={route.path} />)) }
    </div>
);

export default EngangsstonadIndex;
