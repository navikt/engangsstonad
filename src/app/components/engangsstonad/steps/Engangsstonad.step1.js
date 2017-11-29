import React from 'react';

import { Undertittel, Element } from 'nav-frontend-typografi';
import AlertStripe from 'nav-frontend-alertstriper';
import { Radio } from 'nav-frontend-skjema';

import ImageWithText from './../../shared/ImageWithText';
import EmployerUrl from '../../../assets/svg/employer.svg';
import ElementWrapper from './../../../util/ElementWrapper';
import DisplayTextWithLabel from './../../shared/DisplayTextWithLabel';

import styles from './engangsstonad.step.less';

export const Step1 = () => (
    <ElementWrapper>
        <AlertStripe className={styles.marginTopBottom} type="nav-ansatt">Her har vi noe info</AlertStripe>
        <ImageWithText imageUrl={EmployerUrl} text="Placeholder" />
        <Undertittel className={styles.marginTopBottom}>Placeholder</Undertittel>
        <Element className={styles.marginTopBottom}>Placeholder</Element>
        <DisplayTextWithLabel label="Placeholder" text="Placeholder" />
        <Radio className={styles.marginTopBottom} label="Placeholder" name="placeholder-gruppe" />
    </ElementWrapper>
);

export default Step1;
