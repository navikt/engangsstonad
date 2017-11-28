import React from 'react';
import { Link } from 'react-router-dom';

import { Hovedknapp } from 'nav-frontend-knapper';
import { Sidetittel, Undertittel, EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import AlertStripe from 'nav-frontend-alertstriper';
import { Radio } from 'nav-frontend-skjema';

import styles from './step1.less';

export const Step1 = () => ([
    <Sidetittel className={`${styles.marginTopBottom} ${styles.centerText}`}>Heading placeholder</Sidetittel>,
    <AlertStripe className={styles.marginTopBottom} type="nav-ansatt" solid>Her har vi noe info</AlertStripe>,
    <Undertittel className={styles.marginTopBottom}>Placeholder</Undertittel>,
    <Undertittel className={styles.marginTopBottom}>Placeholder</Undertittel>,
    <EtikettLiten>Placeholder</EtikettLiten>,
    <Normaltekst>Placeholder</Normaltekst>,
    <Radio className={styles.marginTopBottom} label="Placeholder" name="placeholder-gruppe" />,
    <Link to="/engangsstonad/steg-2">
        <Hovedknapp className={styles.center}>Fortsett</Hovedknapp>
    </Link>
]);

export default Step1;
