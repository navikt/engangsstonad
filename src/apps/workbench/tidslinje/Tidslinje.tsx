import * as React from 'react';
import * as classNames from 'classnames';

import './tidslinje.less';

type Forelder = 'mor' | 'medforelder';

interface Kalenderinnslag {
	dato: Date;
	hendelser: Hendelse[];
}

interface Hendelse {
	navn: string;
	beskrivelse?: string;
	ekstrainfo?: string;
	forelder?: Forelder;
}

export const kalenderinnslag: Kalenderinnslag[] = [
	{
		dato: new Date(2008, 1, 5),
		hendelser: [{ navn: 'Mor tar mammepermisjon', forelder: 'mor' }]
	},
	{
		dato: new Date(2008, 1, 23),
		hendelser: [{ navn: 'Termin', forelder: 'mor' }]
	},
	{
		dato: new Date(2008, 1, 23),
		hendelser: [{ navn: 'Mor fortsetter mammaperm', forelder: 'mor' }]
	},
	{
		dato: new Date(2008, 6, 2),
		hendelser: [{ navn: 'Pappaperm', forelder: 'medforelder' }]
	},
	{
		dato: new Date(2008, 8, 7),
		hendelser: [{ navn: 'Permisjonsperiode ferdig' }]
	}
];

// const forelderHarHendelse = (forelder: Forelder, hendelser: Hendelse[]): boolean =>

const Hendelseslinje: React.StatelessComponent<{
	forelder: Forelder;
	hendelser: Hendelse[];
	kommendeHendelser?: Hendelse[];
}> = ({ forelder, hendelser, kommendeHendelser }) => {
	const harHendelse = hendelser.find((h) => h.forelder === forelder) !== undefined;
	const periodeFortsetter = kommendeHendelser && kommendeHendelser.find((h) => h.forelder === forelder) !== undefined;
	const cls = classNames('kalenderinnslag__linje', `kalenderinnslag__linje--${forelder}`, {
		'kalenderinnslag__linje--fortsetter': periodeFortsetter
	});
	return harHendelse ? <div className={cls} /> : null;
};

const Kalenderinnslag: React.StatelessComponent<{ innslag: Kalenderinnslag; nesteInnslag?: Kalenderinnslag }> = ({
	innslag,
	nesteInnslag
}) => (
	<div key={innslag.dato.toDateString()} className="kalenderinnslag">
		<Hendelseslinje
			forelder="mor"
			hendelser={innslag.hendelser}
			kommendeHendelser={nesteInnslag && nesteInnslag.hendelser}
		/>
		<Hendelseslinje forelder="medforelder" hendelser={innslag.hendelser} />
		Dato: {innslag.dato.toDateString()}
		{innslag.hendelser.map((hendelse, idx) => (
			<div key={idx}>
				<h4>{hendelse.navn}</h4>
			</div>
		))}
	</div>
);

const hentNesteInnslag = (idx: number, innslag: Kalenderinnslag[]): Kalenderinnslag | undefined => {
	if (idx < innslag.length - 1) {
		return innslag[idx + 1];
	}
	return undefined;
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
