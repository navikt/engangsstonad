import React from 'react';
import { Link } from 'react-router-dom';

import { Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel, Element } from 'nav-frontend-typografi';
import AlertStripe from 'nav-frontend-alertstriper';
import { Radio } from 'nav-frontend-skjema';

import ImageWithText from './../shared/ImageWithText';
import EmployerUrl from './../../images/employer.svg';
import ElementWrapper from './../../util/ElementWrapper';
import DisplayTextWithLabel from './../shared/DisplayTextWithLabel';

import styles from './step1.less';

export const Step1 = () => (
    <ElementWrapper>
        <AlertStripe className={styles.marginTopBottom} type="nav-ansatt">Her har vi noe info</AlertStripe>
        <ImageWithText imageUrl={EmployerUrl} text="Placeholder" />
        <Undertittel className={styles.marginTopBottom}>Placeholder</Undertittel>
        <Element className={styles.marginTopBottom}>Placeholder</Element>
        <DisplayTextWithLabel label="Placeholder" text="Placeholder" />
        <Radio className={styles.marginTopBottom} label="Placeholder" name="placeholder-gruppe" />
        <Link to="/engangsstonad/steg-2">
            <Hovedknapp className={styles.center}>Fortsett</Hovedknapp>
        </Link>
    </ElementWrapper>
);

export default Step1;
