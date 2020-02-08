import * as React from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';

import CustomSVG from 'common/components/custom-svg/CustomSVG';
import { Kjønn } from '../../types/domain/Person';

const womanSvg = require('../../assets/svg/kvinne.svg').default;
const manSvg = require('../../assets/svg/mann.svg').default;

import './søkersPersonalia.less';
interface Props {
    navn: string;
    kjønn: Kjønn;
    personnummer: string;
}

const SøkersPersonalia: React.StatelessComponent<Props> = ({ navn, kjønn, personnummer }) => (
    <div className="søkersPersonalia">
        <CustomSVG iconRef={kjønn === Kjønn.K ? womanSvg : manSvg} size={40} />
        <div className="søkersPersonalia__label">
            <Undertittel className="søkersPersonalia__name capitalizeName">{navn}</Undertittel>
            <Normaltekst className="søkersPersonalia__person">{personnummer}</Normaltekst>
        </div>
    </div>
);

export default SøkersPersonalia;
