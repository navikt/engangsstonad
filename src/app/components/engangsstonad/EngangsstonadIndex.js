// @flow
import React from 'react';

import NavLogo from './../shared/NavLogo';
import RouteWithSubRoutes from './../../util/routing/routes.component';

import styles from './engangsstonadIndex.less';

type Props = {
    routes: Array<any>
}

export const EngangsstonadIndex = (props: Props) => (
    <div className={styles.marginLeftRight}>
        <NavLogo className={styles.center} />
        { props.routes && props.routes.map((route) => (<RouteWithSubRoutes {...route} key={route.path} />)) }
    </div>
);

export default EngangsstonadIndex;
