import * as React from 'react';
import { Uttaksplan } from '../../types';

import './uttaksplan.less';
import { mockPerioder } from './mock/perioder';
import Periodetimeline from 'apps/planlegger/components/uttaksplan/Periodetimeline';

export interface Props {
	plan: Uttaksplan;
}

export class UttaksplanView extends React.Component<Props, {}> {
	render() {
		return (
			<div className="uttaksplan">
				<h2>Uttaksplan</h2>
				<Periodetimeline perioder={mockPerioder} />
			</div>
		);
	}
}
export default UttaksplanView;
