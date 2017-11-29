// @flow
import React from 'react';

import { Sidetittel } from 'nav-frontend-typografi';

import Image from '../shared/Image';
import RouteWithSubRoutes from './../../util/routing/routes.component';
import NavLogoUrl from './../../images/Logo.svg';

import styles from './engangsstonadIndex.less';

type Props = {
    routes: Array<Object>
}

export const EngangsstonadIndex = (props: Props) => (
    <div className={styles.marginLeftRight}>
        <Image imageUrl={NavLogoUrl} className={styles.center} />
        <Sidetittel className={`${styles.marginTopBottom} ${styles.centerText}`}>Søknad om engangsstønad</Sidetittel>
        { props.routes && props.routes.map((route) => (<RouteWithSubRoutes {...route} key={route.path} />)) }
    </div>
);

export default EngangsstonadIndex;
