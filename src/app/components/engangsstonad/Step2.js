import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Column } from 'nav-frontend-grid';
import { Hovedknapp } from 'nav-frontend-knapper';
import { AlertStripeNavAnsatt } from 'nav-frontend-alertstriper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Ingress, Undertittel, EtikettLiten, Normaltekst } from 'nav-frontend-typografi';

import RadioGruppe from '../RadioGruppe';
import styles from './step1.less';


export const radioData = [
    {
        label: 'Ja, jag vil heller søke om foreldrepenger.',
        value: 'foreldrepenger'
    },
    {
        label: 'Nej, jag vil gå videre med denne søknaden og forstår at jag ' +
        'mister retten til foreldrepenger hvis søknaden om engangsstønad blir invilget.',
        value: 'engangstonad'
    }
];

export const Step2 = () => ([
    <Row>
        <Column xs="12" >
            <Ingress>
                Engangsstønad er en skattefri engangssum du kan få for hvert barn du
                /(føder eller) adopterer, når du ikke har tjent opp rett til foreldrepenger.
            </Ingress>
        </Column>
    </Row>,

    <Row>
        <Column xs="12">
            <AlertStripeNavAnsatt
                className={styles.marginTopBottom}
                type="nav-ansatt"
                solid
            >
        Dersom du har /haft arbeid/likestilt inntekt så kan du ha rett på foreldrepenger.
            </AlertStripeNavAnsatt>
        </Column>
    </Row>,

    <Undertittel className={styles.marginBottom}>Arbeid</Undertittel>,
    <EtikettLiten className={styles.marginBottomSmall}>Arbeidsgiver</EtikettLiten>,
    <Normaltekst className={styles.marginBottom}>Nielsen Strikkfabrikk AS</Normaltekst>,
    <EtikettLiten className={styles.marginBottomSmall}>Stillningsprosent</EtikettLiten>,
    <Normaltekst className={styles.marginBottomLarge}>100 prosent fast</Normaltekst>,

    <SkjemaGruppe className={styles.marginBottomLarge}>
        <RadioGruppe
            name="soknadstype"
            listOfRadioData={radioData}
        />
    </SkjemaGruppe>,

    <Row>
        <Column xs="12">
            <Link to="/engangsstonad/steg-1">
                <Hovedknapp type="hoved">Forsett med søknad om engangsstonad</Hovedknapp>
            </Link>
        </Column>
    </Row>
]);

export default Step2;

