import React from 'react';
import { Link } from 'react-router-dom';

import { Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel, EtikettLiten, Normaltekst, Element } from 'nav-frontend-typografi';
import AlertStripe from 'nav-frontend-alertstriper';
import { Radio } from 'nav-frontend-skjema';

import Image from './../shared/Image';
import EmployerUrl from './../../images/employer.svg';
import ElementWrapper from './../../util/ElementWrapper';

import styles from './step1.less';

export const Step1 = () => (
    <ElementWrapper>
        <AlertStripe className={styles.marginTopBottom} type="nav-ansatt">Her har vi noe info</AlertStripe>
        <Image imageUrl={EmployerUrl} className={styles.pullLeft} />
        <Undertittel className={styles.marginTopBottom}>Placeholder</Undertittel>
        <Undertittel className={styles.marginTopBottom}>Placeholder</Undertittel>
        <Element className={styles.marginTopBottom}>Placeholder</Element>
        <EtikettLiten>Placeholder</EtikettLiten>
        <Normaltekst>Placeholder</Normaltekst>
        <Radio className={styles.marginTopBottom} label="Placeholder" name="placeholder-gruppe" />
        <Link to="/engangsstonad/steg-2">
            <Hovedknapp className={styles.center}>Fortsett</Hovedknapp>
        </Link>
    </ElementWrapper>
);

export default Step1;
