import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';

export const Step5 = () => (
	<div>
		<Normaltekst>
			Søknaden ble innsendt kl. 14:32 den 19 desember 2017 og du kan følge med
			på søknaden sin status på&nbsp;
			<Lenke href="/">Ditt NAV.</Lenke>
		</Normaltekst>
	</div>
);

export default Step5;
