import * as React from 'react';
const { Normaltekst, Undertittel } = require('nav-frontend-typografi');

import './personaliaLabel.less';

interface Props {
    navn: string;
    personnummer: string;
}

const PersonaliaLabel: React.StatelessComponent<Props> = ({ navn, personnummer }) => (
    <div className="personaliaLabel">
        <Undertittel className="personaliaLabel__name capitalizeName">{navn}</Undertittel>
        <Normaltekst className="personaliaLabel__person">{personnummer}</Normaltekst>
    </div>
);
export default PersonaliaLabel;
