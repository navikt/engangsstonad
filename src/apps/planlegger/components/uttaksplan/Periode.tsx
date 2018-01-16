import * as React from 'react';
import * as classNames from 'classnames';

import { Uttaksperiode, Periodetype } from '../../types/index';

export interface Props {
	periode: Uttaksperiode;
}

const Periode: React.StatelessComponent<Props> = ({ periode }) => {
	const cls = classNames('uttaksperiode', `uttaksperiode--${periode.periodetype}`);
	return (
		<div className={cls}>
			<h2>{Periodetype[periode.periodetype]}</h2>
			{periode.periode.start.toDateString()} - {periode.periode.slutt.toDateString()}
		</div>
	);
};

export default Periode;
