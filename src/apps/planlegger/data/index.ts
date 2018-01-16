import { Uttaksplan, Forelder, Mødrekvote, StønadskontoType, Periodetype } from '../types';

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
	periode: {
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
	periode: {
		start: new Date(2018, 1, 26),
		slutt: new Date(2018, 3, 6),
		uker: 6
	}
};

UttaksplanMock.perioderMor.push(førTermin);
UttaksplanMock.perioderMor.push(etterFødsel);
