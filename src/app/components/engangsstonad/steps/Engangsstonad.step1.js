import React from 'react';
import { Link } from 'react-router-dom';
import { Undertittel, Element, Normaltekst } from 'nav-frontend-typografi';
import AlertStripe from 'nav-frontend-alertstriper';
import { Radio } from 'nav-frontend-skjema';

import IconWithText from '../../shared/IconWithText';
import ElementWrapper from './../../../util/ElementWrapper';
import DisplayTextWithLabel from './../../shared/DisplayTextWithLabel';
import InputField from './../../../redux/form/components/InputField';
import DialogBox from '../../../components/shared/DialogBox';

import styles from './engangsstonad.step.less';

export const Step11 = () => (
    <ElementWrapper>
        <AlertStripe className={styles.marginTopBottom} type="nav-ansatt">Her har vi noe info</AlertStripe>
        <IconWithText kind="arbeidsgiver" text="Placeholder" />
        <Undertittel className={styles.marginTopBottom}>Placeholder</Undertittel>
        <Element className={styles.marginTopBottom}>Placeholder</Element>
        <DisplayTextWithLabel label="Placeholder" text="Placeholder" />
        <Radio className={styles.marginTopBottom} label="Placeholder" name="placeholder-gruppe" />
        <InputField name="steg1input" label="Test" />
    </ElementWrapper>
);

const testText = 'Husk att du kan ha rett på foreldrepenger hvis du '
+ 'har hatt inntekt i minst 6 av de 10 siste månedene.';
export const Step1 = () => (
    <ElementWrapper>
        <DialogBox type="info">
            <Normaltekst>{testText}</Normaltekst>
            <Link to="/">klikk meg</Link>
        </DialogBox>
    </ElementWrapper>
);
export default Step1;
