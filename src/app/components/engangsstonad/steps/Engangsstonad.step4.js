import React from 'react';

import { Undertittel, Normaltekst } from 'nav-frontend-typografi';

import DialogBox from '../../../components/shared/DialogBox';
import ElementWrapper from '../../../util/ElementWrapper';
import DisplayTextWithLabel from './../../shared/DisplayTextWithLabel';
import CheckboxField from './../../../redux/form/components/CheckboxField';

export const Step4 = () => (
    <ElementWrapper>
        <DialogBox type="info">
            <Normaltekst>
                Les nøye gjennom oppsummeringen før du sender inn søknaden.
                Hvis du trenger å gjøre endringer kan du gå tilbake til tidligere steg
            </Normaltekst>
        </DialogBox>
        <Undertittel>Om deg som søker</Undertittel>
        <DisplayTextWithLabel label="Navn" text="Lise Mari Haugland" />
        <DisplayTextWithLabel label="Fødselsnummer" text="03039256457" />
        <Undertittel>Opplysninger om barnet eller barna</Undertittel>
        <DisplayTextWithLabel label="Antall barn forventet" text="1" />
        <DisplayTextWithLabel label="Forventet termindato" text="01.01.2018" />
        <DisplayTextWithLabel label="Utstedt dato for terminbekreftelse" text="01.12.2017" />
        <DisplayTextWithLabel label="Vedlegg" text="<link til vedlegg her>" />
        <Undertittel>Opplysninger om tilknytning til Norge</Undertittel>
        <DisplayTextWithLabel label="Adresse" text="Stockholmsgata 16B, 0566 Oslo, Norge" />
        <DisplayTextWithLabel label="Oppholdt seg i Norge de siste 12 månedene" text="Ja" />
        <DisplayTextWithLabel label="Oppholder seg i Norge nå" text="Ja" />
        <DisplayTextWithLabel label="Skal oppholde seg i Norge de neste 12 månedene" text="Ja" />
        <CheckboxField
            name="bekreftOpplysninger"
            label="De opplysninger jeg har oppgitt er riktig og jeg har ikke holdt tilbake opplysninger
                som har betydning for min rett til engangsstønad."
        />
    </ElementWrapper>
);

export default Step4;
