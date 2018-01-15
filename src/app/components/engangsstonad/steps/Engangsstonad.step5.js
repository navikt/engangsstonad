import React from 'react';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';

export const Step5 = () => (
	<div>
		<Normaltekst>
			Søknaden ble innsendt kl. 14:32 den 19 desember 2017 og du kan følge med
			på søknaden sin status på&nbsp;
			<Link to="/">Ditt NAV.</Link>
		</Normaltekst>
	</div>
);

export default Step5;
