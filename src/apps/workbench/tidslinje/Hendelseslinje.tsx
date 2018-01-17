import * as React from 'react';
import * as classNames from 'classnames';

import { Forelder, Delhendelse, Hendelsestype } from 'apps/workbench/tidslinje/types';

export interface Props {
	forelder: Forelder;
	hendelser: Delhendelse[];
	type: Hendelsestype;
	kommendeHendelser?: Delhendelse[];
}

const Hendelseslinje: React.StatelessComponent<Props> = ({ forelder, type, hendelser, kommendeHendelser }) => {
	const hendelse = hendelser.find((h) => h.forelder === forelder);
	if (!hendelse) {
		return null;
	}
	const erFødselEllerTermin = type === 'termin';
	const periodeFortsetter = kommendeHendelser && kommendeHendelser.find((h) => h.forelder === forelder) !== undefined;
	const cls = classNames('kalenderinnslag__linje', `kalenderinnslag__linje--${forelder}`, {
		'kalenderinnslag__linje--fortsetter': periodeFortsetter || erFødselEllerTermin,
		'kalenderinnslag__linje--fodsel': erFødselEllerTermin,
		'kalenderinnslag__linje--gradert': hendelse.gradert
	});
	return <div className={cls} />;
};
export default Hendelseslinje;
