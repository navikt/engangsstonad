import { Tidsperiode } from 'apps/planlegger/types';

export type Kvote = 'Mødrekvote' | 'Fedrekvote' | 'Fellesperiode';
export type Forelder = 'Mor' | 'Medforelder';

export interface Periode {
	tidsrom: Tidsperiode;
	navn: string;
	kvote: Kvote;
	forelder: Forelder;
}

export const mockPerioder: Periode[] = [
	{
		navn: 'Mammaperm',
		tidsrom: {
			start: new Date(2018, 1, 5),
			slutt: new Date(2018, 1, 23),
			dager: 3 * 5
		},
		kvote: 'Mødrekvote',
		forelder: 'Mor'
	},
	{
		navn: 'Mammaperm',
		tidsrom: {
			start: new Date(2018, 1, 26),
			slutt: new Date(2018, 2, 30),
			dager: 5 * 5
		},
		kvote: 'Mødrekvote',
		forelder: 'Mor'
	},
	{
		navn: 'Pappaperm',
		tidsrom: {
			start: new Date(2018, 3, 2),
			slutt: new Date(2018, 5, 29),
			dager: 13 * 5
		},
		kvote: 'Fellesperiode',
		forelder: 'Medforelder'
	},
	{
		navn: 'Pappaperm',
		tidsrom: {
			start: new Date(2018, 6, 2),
			slutt: new Date(2018, 8, 7),
			dager: 10 * 5
		},
		kvote: 'Fedrekvote',
		forelder: 'Medforelder'
	}
];
