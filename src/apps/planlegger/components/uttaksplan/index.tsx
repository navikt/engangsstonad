import * as React from 'react';
import { Uttaksplan } from '../../types';
import Periode from './Periode';

import './uttaksplan.less';

export interface Props {
	plan: Uttaksplan;
}

export class UttaksplanView extends React.Component<Props, {}> {
	render() {
		const { plan } = this.props;
		return (
			<div className="uttaksplan">
				<h2>Uttaksplan</h2>
				<div className="periodeliste">{plan.perioderMor.map((p, idx) => <Periode key={idx} periode={p} />)}</div>
			</div>
		);
	}
}
export default UttaksplanView;
