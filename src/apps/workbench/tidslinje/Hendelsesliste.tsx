import * as React from 'react';
import { Permisjonshendelse, HendelseType } from 'apps/workbench/tidslinje/types';
import CustomSVG from 'shared/custom-svg/CustomSVG';

const hjerte = require('./assets/hjerte.svg');

export interface Props {
	hendelser: Permisjonshendelse[];
}

const Hendelsesliste: React.StatelessComponent<Props> = ({ hendelser }) => (
	<ul className="hendelsesliste">
		{hendelser.map((hendelse, idx) => (
			<li key={hendelse.forelder}>
				{hendelse.type === HendelseType.fødsel ||
					(hendelse.type === HendelseType.termin && (
						<span className="hendelsesliste__ikon">
							<CustomSVG iconRef={hjerte.default} size={14} />
						</span>
					))}
				{hendelse.navn}
			</li>
		))}
	</ul>
);

export default Hendelsesliste;
