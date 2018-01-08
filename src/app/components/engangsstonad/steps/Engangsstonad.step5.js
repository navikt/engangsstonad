import React from 'react';
import { Link } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';

import DialogBox from 'components/shared/dialog-box/DialogBox';

export const Step5 = () => (
	<div>
		<DialogBox type="success">
			<Normaltekst>
				Bra jobbet! Din søknad er nå sendt til NAV. Vi tar kontakt med deg hvis
				du trenger noe mer. Du kan finne status på din søknad på
			</Normaltekst>
			<Link to="/">Ditt NAV.</Link>
		</DialogBox>
	</div>
);

export default Step5;
