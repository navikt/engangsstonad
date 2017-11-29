import React from 'react';
import { Link } from 'react-router-dom';

import { Hovedknapp } from 'nav-frontend-knapper';
import { AlertStripeNavAnsatt } from 'nav-frontend-alertstriper';

import ElementWrapper from './../../util/ElementWrapper';
import RadioGruppe from '../shared/RadioGruppe';
import InformationPanel from '../shared/InformationPanel';
import EmployeeLogo from '../../images/employer.svg';

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

export const opplysningData = [
    {
        label: 'ARBEIDSGIVER',
        text: 'Nielsen Strikkfabrikk AS'
    },
    {
        label: 'STILLINGSPROSENT',
        text: '100 prosent fast'
    }
];

export const Step2 = () => (
    <ElementWrapper>
        <AlertStripeNavAnsatt
            className={styles.marginBottomLarge}
            type="nav-ansatt"
            solid
        >
            Dersom du har /haft arbeid/likestilt inntekt så kan du ha rett på foreldrepenger.
        </AlertStripeNavAnsatt>

        <InformationPanel imgSrc={EmployeeLogo} title="Arbeid" opplysningData={opplysningData} />

        <RadioGruppe
            className={styles.radioGruppe}
            name="soknadstype"
            listOfRadioData={radioData}
        />

        <Link to="/engangsstonad/steg-3">
            <Hovedknapp className={styles.center} type="hoved">Fortsett med søknad...</Hovedknapp>
        </Link>
    </ElementWrapper>
);
export default Step2;

