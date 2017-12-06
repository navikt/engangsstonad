import React from 'react';
import { Link } from 'react-router-dom';
import { SkjemaGruppe, Checkbox } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import ElementWrapper from './../../../util/ElementWrapper';
import DialogBox from '../../../components/shared/DialogBox';
import styles from './engangsstonad.step.less';

const testText = `Husk att du kan ha rett på foreldrepenger hvis du 
    har hatt inntekt i minst 6 av de 10 siste månedene.`;

export const Step1 = () => (
    <ElementWrapper>
        <DialogBox type="info">
            <Normaltekst>Husk att du kan ha rett på foreldrepenger hvis du har hatt inntekt i minst 6 av de 10 siste månedene.</Normaltekst>
            <Link to="/">Les mer her</Link>
        </DialogBox>

        <SkjemaGruppe title="Egenerklæring">
            <Checkbox label="Jeg er klar over at dersom
            jeg gir uriktige opplysninger eller holder
            tilbake opplysninger som har betydning for
            min rett til engangsstønad, kan pengene holdes
            tilbake eller kreves tilbake, og det kan eventuelt
            medføre straffeansvar." />
        </SkjemaGruppe>
    </ElementWrapper>
);

export default Step1;
