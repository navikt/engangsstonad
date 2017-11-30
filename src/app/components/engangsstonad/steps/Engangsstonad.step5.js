import React from 'react';

import { AlertStripeNavAnsatt } from 'nav-frontend-alertstriper';
import ElementWrapper from '../../../util/ElementWrapper';
import OpplysningPanel from '../../shared/OpplysningPanel';
import BenefitLogo from '../../../assets/svg/benefit.svg';
import styles from './engangsstonad.step.less';


const opplysningData = [
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
        <OpplysningPanel
            title="Stønad"
            imgSrc={BenefitLogo}
            imgAlt="Ikon for stønad"
            opplysningData={opplysningData}
        />
    </ElementWrapper>
);
export default Step5;
