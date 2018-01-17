import { Hendelse } from './types';

export const kalenderinnslag: Hendelse[] = [
	{
		dato: new Date(2018, 1, 5),
		delhendelser: [{ navn: 'Mor tar mammepermisjon', forelder: 'mor' }],
		type: 'uttak'
	},
	{
		dato: new Date(2018, 1, 24),
		delhendelser: [{ navn: 'Termin', forelder: 'mor' }],
		type: 'termin'
	},
	{
		dato: new Date(2018, 1, 23),
		delhendelser: [{ navn: 'Mor fortsetter mammaperm', forelder: 'mor' }],
		type: 'uttak'
	},
	{
		dato: new Date(2018, 6, 2),
		delhendelser: [
			{ navn: 'Pappaperm 50%', forelder: 'medforelder', gradert: true },
			{ navn: 'Mammaperm 50%', forelder: 'mor', gradert: true }
		],
		type: 'uttak'
	},
	{
		dato: new Date(2018, 8, 7),
		delhendelser: [{ navn: 'Pappaperm 100%', forelder: 'medforelder' }],
		type: 'uttak'
	},
	{
		dato: new Date(2018, 8, 7),
		delhendelser: [{ navn: 'Permisjonsperiode ferdig' }],
		type: 'slutt'
	}
];
