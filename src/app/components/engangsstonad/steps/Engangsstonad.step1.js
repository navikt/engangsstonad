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
import CheckboxField from './../../../redux/form/components/CheckboxField';

import styles from './engangsstonad.step.less';

const minLength5 = (text) => {
    if (text.length < 5) {
        return [{ id: 'Must be greater than 5 from step 1 validate function' }];
    }

    return undefined;
};

const required = (text) => {
    if (!text) {
        return [{ id: 'Required from step 1 validate function' }];
    }

    return undefined;
};

const testText = `Husk att du kan ha rett på foreldrepenger hvis du 
    har hatt inntekt i minst 6 av de 10 siste månedene.`;

export const Step1 = () => (
    <ElementWrapper>
        <DialogBox type="info">
            <Normaltekst>{testText}</Normaltekst>
            <Link to="/">klikk meg</Link>
        </DialogBox>
        <AlertStripe className={styles.marginTopBottom} type="nav-ansatt">Her har vi noe info</AlertStripe>
        <IconWithText kind="arbeidsgiver" text="Placeholder" />
        <Undertittel className={styles.marginTopBottom}>Placeholder</Undertittel>
        <Element className={styles.marginTopBottom}>Placeholder</Element>
        <DisplayTextWithLabel label="Placeholder" text="Placeholder" />
        <Radio className={styles.marginTopBottom} label="Placeholder" name="placeholder-gruppe" />
        <InputField name="steg1input" label="Test" validate={[required, minLength5]} />
        <CheckboxField name="checkboxinput" label="Some label" validate={required} />
    </ElementWrapper>
);

export default Step1;
