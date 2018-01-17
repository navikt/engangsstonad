import * as React from 'react';
import * as classNames from 'classnames';

import { hentNesteInnslag } from 'apps/workbench/tidslinje/utils/index';
import Hendelseslinje from 'apps/workbench/tidslinje/Hendelseslinje';
import CustomSVG from 'shared/custom-svg/CustomSVG';

import { Hendelse } from './types';
import { kalenderinnslag } from './data';
import Dato from './Dato';

const hjerte = require('./assets/hjerte.svg');

import './tidslinje.less';

const Kalenderinnslag: React.StatelessComponent<{
	innslag: Hendelse;
	nesteInnslag?: Hendelse;
}> = ({ innslag, nesteInnslag }) => {
	const cls = classNames('kalenderinnslag', {
		'kalenderinnslag--fodsel': innslag.type === 'termin'
	});

	return (
		<div key={innslag.dato.toDateString()} className={cls}>
			<Hendelseslinje
				forelder="mor"
				hendelser={innslag.delhendelser}
				type={innslag.type}
				kommendeHendelser={nesteInnslag && nesteInnslag.delhendelser}
			/>
			<Hendelseslinje
				forelder="medforelder"
				hendelser={innslag.delhendelser}
				kommendeHendelser={nesteInnslag && nesteInnslag.delhendelser}
				type={innslag.type}
			/>
			<p className="kalenderinnslag__dato">
				<Dato dato={innslag.dato} />
			</p>
			<div className="kalenderinnslag__hendelser">
				<ul className="hendelsesliste">
					{innslag.delhendelser.map((hendelse, idx) => (
						<li key={idx}>
							{innslag.type === 'termin' && (
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
			{kalenderinnslag.map((innslag, idx) => (
				<div className="tidslinje__kalenderinnslag" key={idx}>
					<Kalenderinnslag key={idx} innslag={innslag} nesteInnslag={hentNesteInnslag(idx, kalenderinnslag)} />
				</div>
			))}
		</div>
	);
};

export default Tidslinje;
