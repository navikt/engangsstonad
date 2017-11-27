import React from 'react';
import { Link } from 'react-router-dom';

import { Hovedknapp } from 'nav-frontend-knapper';

export const Step1 = () => (
    <Link to="/engangsstonad/steg-2">
        <Hovedknapp>Fortsett</Hovedknapp>
    </Link>
);

export default Step1;
