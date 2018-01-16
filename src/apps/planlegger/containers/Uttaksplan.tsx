import * as React from 'react';

import DialogBox from '../../../app/components/shared/dialog-box/DialogBox';
import { UttaksplanView } from '../components/uttaksplan/index';

import { UttaksplanMock } from '../data';

export class Uttaksplan extends React.Component {
	render() {
		return (
			<div>
				<DialogBox type="info">Juster fordelingen og datoene under</DialogBox>
				<UttaksplanView plan={UttaksplanMock} />
			</div>
		);
	}
}

export default Uttaksplan;
