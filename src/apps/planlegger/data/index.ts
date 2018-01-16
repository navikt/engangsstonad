import { Uttaksplan, Forelder, Mødrekvote, StønadskontoType, Periodetype, Tidsperiode } from '../types';

export const UttaksplanMock: Uttaksplan = {
	periode: {
		start: new Date(),
		slutt: new Date(),
		uker: 0
	},

	tilgjengeligeDager: 98,
	fødselsdato: new Date(),
	perioderMor: [],
	perioderMedforelder: []
};

const førTermin: Mødrekvote = {
	stønadskonto: StønadskontoType.Mødrekvote,
	periodetype: Periodetype.Stønadsperiode,
	forelder: Forelder.mor,
	tidsrom: {
		start: new Date(2018, 1, 5),
		slutt: new Date(2018, 1, 23),
		uker: 3
	}
};

const etterFødsel: Mødrekvote = {
	stønadskonto: StønadskontoType.Mødrekvote,
	periodetype: Periodetype.Stønadsperiode,
	forelder: Forelder.mor,
	prosent: 100,
	tidsrom: {
		start: new Date(2018, 1, 26),
		slutt: new Date(2018, 3, 6),
		uker: 6
	}
};

UttaksplanMock.perioderMor.push(førTermin);
UttaksplanMock.perioderMor.push(etterFødsel);

export type Kvote = 'Mødrekvote' | 'Fedrekvote' | 'Fellesperiode';

export interface Periode {
	tidsrom: Tidsperiode;
	navn: string;
	kvote: Kvote;
}

export const mockPerioder: Periode[] = [
	{
		navn: 'Mammaperm før fødsel',
		tidsrom: {
			start: new Date(2018, 1, 5),
			slutt: new Date(2018, 1, 23)
		},
		kvote: 'Mødrekvote'
	}
];
