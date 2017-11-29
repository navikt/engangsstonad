import React from 'react';
import { Link } from 'react-router-dom';
import { Hovedknapp } from 'nav-frontend-knapper';
import { AlertStripeNavAnsatt } from 'nav-frontend-alertstriper';
import ElementWrapper from './../../util/ElementWrapper';
import InformationPanel from '../shared/InformationPanel';
import BenefitLogo from '../../images/benefit.svg';
import styles from './step1.less';


export const opplysningData = [
    {
        label: 'label',
        text: 'text'
    },
    {
        label: 'label',
        text: 'text'
    },
    {
        label: 'label',
        text: 'text'
    }
];

export const Step5 = () => (
    <ElementWrapper>
        <AlertStripeNavAnsatt
            className={styles.marginTopBottom}
            type="nav-ansatt"
        >
            Du kan ha rett på foreldrepenger hvis du bla bla arbeid opptjening
        </AlertStripeNavAnsatt>

        <InformationPanel
            title="Stønad"
            imgSrc={BenefitLogo}
            opplysningData={opplysningData}
        />
        <Link to="/engangsstonad/steg-1">
            <Hovedknapp className={styles.center} type="hoved">Fortsett med søknad...</Hovedknapp>
        </Link>
    </ElementWrapper>
);
export default Step5;
