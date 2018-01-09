import { Uttaksplan, Uttaksperiode, Periodetype, StønadskontoType, UtsettelseÅrsakType } from '../types';

export const UttaksplanMock: Uttaksplan = {
	periode: {
		start: new Date(),
		slutt: new Date()
	},

	tilgjengeligeDager: 98,
	fødselsdato: new Date(),
	perioderMor: [],
	perioderMedforelder: []
};

function assertNever(x: never): never {
	throw new Error('Unexpected object: ' + x);
}

export function typeTest(periode: Uttaksperiode): void | {} {
	if (periode.periodetype === Periodetype.Stønadsperiode) {
		switch (periode.stønadskonto) {
			case StønadskontoType.Mødrekvote:
				return periode.prosent;
			case StønadskontoType.Fedrekvote:
				return;
			case StønadskontoType.Fellesperiode:
				return;
			case StønadskontoType.Foreldrepenger:
				return;
			default:
				return assertNever(periode);
		}
	} else if (periode.periodetype === Periodetype.Utsettelse) {
		switch (periode.årsak) {
			case UtsettelseÅrsakType.Ferie:
				return;
			case UtsettelseÅrsakType.Arbeid:
				return;
			case UtsettelseÅrsakType.InnlagtBarn:
				return;
			case UtsettelseÅrsakType.SykdomSkade:
				return;
			case UtsettelseÅrsakType.Annet:
				return;
			default:
				return assertNever(periode);
		}
	}
}
