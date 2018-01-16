import * as React from 'react';
import * as classNames from 'classnames';

import { Uttaksperiode, Periodetype, Forelder } from '../../types/index';

export interface Props {
	periode: Uttaksperiode;
}

const Periode: React.StatelessComponent<Props> = ({ periode }) => {
	const cls = classNames('uttaksperiode', `uttaksperiode--${periode.periodetype}`);
	return (
		<div className={cls}>
			<h2>{Periodetype[periode.periodetype]}</h2>
			<p>
				{periode.tidsrom.start.toDateString()} - {periode.tidsrom.slutt.toDateString()} ({periode.tidsrom.uker} uker)
			</p>
			{Forelder[periode.forelder]}
		</div>
	);
};

export default Periode;
