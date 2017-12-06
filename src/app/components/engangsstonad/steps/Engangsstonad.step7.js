import React from 'react';
import { AlertStripeNavAnsatt } from 'nav-frontend-alertstriper';
import ElementWrapper from '../../../util/ElementWrapper';
import OpplysningPanel from '../../shared/OpplysningPanel';
import styles from './engangsstonad.step.less';


const opplysningData = [
    {
        label: 'ARBEIDSGIVER',
        text: 'Nielsen Strikkfabrikk AS'
    },
    {
        label: 'STILLINGSPROSENT',
        text: '100 prosent fast'
    }
];

const Step7 = () => (
    <ElementWrapper>
        <AlertStripeNavAnsatt
            className={styles.marginTopBottom}
            type="nav-ansatt"
        >
            Vi trenger å vite mer informasjon om fødselen som søknaden gjelder.
        </AlertStripeNavAnsatt>

        <OpplysningPanel
            iconKind="arbeidsgiver"
            title="Arbeid"
            opplysningData={opplysningData}
        />
    </ElementWrapper>
);
export default Step7;
