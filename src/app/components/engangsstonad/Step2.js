import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Column } from 'nav-frontend-grid';
import { Hovedknapp } from 'nav-frontend-knapper';

export const Step2 = () => ([
    <Row>
        <Column xs="12">
            <Link to="/engangsstonad/steg-2">
                <Hovedknapp>Fortsett</Hovedknapp>
            </Link>
        </Column>
    </Row>,
    <Row>
        <Column xs="12">
            <Link to="/engangsstonad/steg-1">
                <Hovedknapp>Tilbake</Hovedknapp>
            </Link>
        </Column>
    </Row>
]);

export default Step2;
