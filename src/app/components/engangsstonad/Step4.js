import React from 'react';
import { Link } from 'react-router-dom';

import { Undertittel } from 'nav-frontend-typografi';
import AlertStripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';

import CheckboxWithLine from './../shared/CheckboxWithLine';
import ElementWrapper from './../../util/ElementWrapper';

import styles from './step1.less';

const checkboxData = [
    {
        label: 'NAVN',
        text: 'Lise Haugdahl'
    },
    {
        label: 'FØDSELSNUMMER',
        text: '01111799999'
    }
];

export const Step4 = () => (
    <ElementWrapper>
        <AlertStripe
            className={styles.marginTopBottom}
            type="nav-ansatt"
        >
            Vi har funnet opplysninger om barn som du er forelder til
        </AlertStripe>
        <Undertittel className={styles.marginTopBottom}>Gjelder søknaden dette barnet?</Undertittel>
        <CheckboxWithLine content={checkboxData} className={styles.marginTopBottom} />
        <CheckboxWithLine content={checkboxData} className={styles.marginTopBottom} />
        <Link to="/engangsstonad/steg-1">
            <Hovedknapp className={styles.marginTopBottom}>Søknad gjelder annet barn</Hovedknapp>
        </Link>
    </ElementWrapper>
);

export default Step4;
