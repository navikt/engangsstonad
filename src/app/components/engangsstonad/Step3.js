import React from 'react';
import { Link } from 'react-router-dom';
import { Hovedknapp } from 'nav-frontend-knapper';
import { AlertStripeNavAnsatt } from 'nav-frontend-alertstriper';

import ElementWrapper from './../../util/ElementWrapper';

import styles from './step1.less';

export const Step3 = () => (
    <ElementWrapper>
        <AlertStripeNavAnsatt
            className={styles.marginTopBottom}
            type="nav-ansatt"
        >
        Du kan ha rett på foreldrepenger hvis du bla bla arbeid opptjening
        </AlertStripeNavAnsatt>,

        <Link to="/engangsstonad/steg-4">
            <Hovedknapp className={styles.center} type="hoved">Fortsett med søknad...</Hovedknapp>
        </Link>
    </ElementWrapper>
);
export default Step3;
