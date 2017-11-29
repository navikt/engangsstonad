import React from 'react';

import { AlertStripeNavAnsatt } from 'nav-frontend-alertstriper';

import ElementWrapper from '../../../util/ElementWrapper';

import styles from './engangsstonad.step.less';

export const Step3 = () => (
    <ElementWrapper>
        <AlertStripeNavAnsatt
            className={styles.marginTopBottom}
            type="nav-ansatt"
        >
            Du kan ha rett på foreldrepenger hvis du bla bla arbeid opptjening
        </AlertStripeNavAnsatt>
    </ElementWrapper>
);
export default Step3;
