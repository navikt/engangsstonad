import * as React from 'react';
import * as classNames from 'classnames';

import { hentNesteInnslag } from './utils';
import CustomSVG from 'shared/custom-svg/CustomSVG';

import { TidslinjeInnslag, Forelder, Permisjonshendelse, InnslagType } from './types';
import { mockTidslinjeData } from './data';
import Dato from '../Dato/Dato';

const hjerte = require('./assets/hjerte.svg');

import './tidslinje.less';

interface InnslagStrekProps {
	forelder: Forelder;
	hendelser: Permisjonshendelse[];
	type: InnslagType;
	kommendeHendelser?: Permisjonshendelse[];
}

const InnslagStrek: React.StatelessComponent<InnslagStrekProps> = ({
	forelder,
	type,
	hendelser,
	kommendeHendelser
}) => {
	const hendelse = hendelser.find((h) => h.forelder === forelder);
	if (!hendelse) {
		return null;
	}
	const erFødselEllerTermin = type === InnslagType.terminEllerFodsel;
	const periodeFortsetter = kommendeHendelser && kommendeHendelser.find((h) => h.forelder === forelder) !== undefined;
	const cls = classNames('kalenderinnslag__linje', `kalenderinnslag__linje--${forelder}`, {
		'kalenderinnslag__linje--fortsetter': periodeFortsetter || erFødselEllerTermin,
		'kalenderinnslag__linje--fodsel': erFødselEllerTermin,
		'kalenderinnslag__linje--gradert': hendelse.gradert
	});
	return <div className={cls} />;
};

const TidslinjeInnslag: React.StatelessComponent<{
	innslag: TidslinjeInnslag;
	nesteInnslag?: TidslinjeInnslag;
}> = ({ innslag, nesteInnslag }) => {
	const cls = classNames('kalenderinnslag', {
		'kalenderinnslag--fodsel': innslag.type === InnslagType.terminEllerFodsel
	});

	return (
		<div key={innslag.dato.toDateString()} className={cls}>
			<InnslagStrek
				forelder="mor"
				hendelser={innslag.hendelser}
				type={innslag.type}
				kommendeHendelser={nesteInnslag && nesteInnslag.hendelser}
			/>
			<InnslagStrek
				forelder="medforelder"
				hendelser={innslag.hendelser}
				kommendeHendelser={nesteInnslag && nesteInnslag.hendelser}
				type={innslag.type}
			/>
			<p className="kalenderinnslag__dato">
				<Dato dato={innslag.dato} />
			</p>
			<div className="kalenderinnslag__hendelser">
				<ul className="hendelsesliste">
					{innslag.hendelser.map((hendelse, idx) => (
						<li key={idx}>
							{innslag.type === InnslagType.terminEllerFodsel && (
								<span className="hendelsesliste__ikon">
									<CustomSVG iconRef={hjerte.default} size={14} />
								</span>
							)}
							{hendelse.navn}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

const Tidslinje: React.StatelessComponent<{}> = () => {
	return (
		<div className="tidslinje">
			{mockTidslinjeData.map((innslag, idx) => (
				<div className="tidslinje__kalenderinnslag" key={idx}>
					<TidslinjeInnslag key={idx} innslag={innslag} nesteInnslag={hentNesteInnslag(idx, mockTidslinjeData)} />
				</div>
			))}
		</div>
	);
};

export default Tidslinje;
