import * as React from 'react';
import * as classNames from 'classnames';

import { Delhendelse, Hendelse, Forelder } from './types';
import { kalenderinnslag } from './data';
import Dato from './Dato';

import './tidslinje.less';
import { hentNesteInnslag } from 'apps/workbench/tidslinje/utils/index';

const Hendelseslinje: React.StatelessComponent<{
	forelder: Forelder;
	hendelser: Delhendelse[];
	kommendeHendelser?: Delhendelse[];
}> = ({ forelder, hendelser, kommendeHendelser }) => {
	const hendelse = hendelser.find((h) => h.forelder === forelder);
	if (!hendelse) {
		return null;
	}
	const periodeFortsetter = kommendeHendelser && kommendeHendelser.find((h) => h.forelder === forelder) !== undefined;
	const cls = classNames('kalenderinnslag__linje', `kalenderinnslag__linje--${forelder}`, {
		'kalenderinnslag__linje--fortsetter': periodeFortsetter,
		'kalenderinnslag__linje--gradert': hendelse.gradert
	});
	return <div className={cls} />;
};

const Kalenderinnslag: React.StatelessComponent<{
	innslag: Hendelse;
	nesteInnslag?: Hendelse;
}> = ({ innslag, nesteInnslag }) => (
	<div key={innslag.dato.toDateString()} className="kalenderinnslag">
		<Hendelseslinje
			forelder="mor"
			hendelser={innslag.delhendelser}
			kommendeHendelser={nesteInnslag && nesteInnslag.delhendelser}
		/>
		<Hendelseslinje forelder="medforelder" hendelser={innslag.delhendelser} />
		<p className="kalenderinnslag__dato">
			<Dato dato={innslag.dato} />
		</p>
		<ul>{innslag.delhendelser.map((hendelse, idx) => <li key={idx}>{hendelse.navn}</li>)}</ul>
	</div>
);

const Tidslinje: React.StatelessComponent<{}> = () => {
	return (
		<div className="tidslinje">
			{kalenderinnslag.map((innslag, idx) => (
				<div className="tidslinje__kalenderinnslag" key={idx}>
					<Kalenderinnslag key={idx} innslag={innslag} nesteInnslag={hentNesteInnslag(idx, kalenderinnslag)} />
				</div>
			))}
		</div>
	);
};

export default Tidslinje;
