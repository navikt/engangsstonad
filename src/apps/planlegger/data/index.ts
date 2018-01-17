import { Uttaksplan, Forelder, Modrekvote, StonadskontoType, Periodetype } from '../types';

export const UttaksplanMock: Uttaksplan = {
	periode: {
		start: new Date(),
		slutt: new Date(),
		uker: 0
	},

	tilgjengeligeDager: 98,
	fodselsdato: new Date(),
	perioderMor: [],
	perioderMedforelder: []
};

const forTermin: Modrekvote = {
	stønadskonto: StonadskontoType.Modrekvote,
	periodetype: Periodetype.Stonadsperiode,
	forelder: Forelder.mor,
	tidsrom: {
		start: new Date(2018, 1, 5),
		slutt: new Date(2018, 1, 23),
		uker: 3
	}
};

const etterFodsel: Modrekvote = {
	stønadskonto: StonadskontoType.Modrekvote,
	periodetype: Periodetype.Stonadsperiode,
	forelder: Forelder.mor,
	prosent: 100,
	tidsrom: {
		start: new Date(2018, 1, 26),
		slutt: new Date(2018, 3, 6),
		uker: 6
	}
};

UttaksplanMock.perioderMor.push(forTermin);
UttaksplanMock.perioderMor.push(etterFodsel);
