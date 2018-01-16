export * from './perioder';

export enum Dekningsgrad {
	'80%',
	'100%'
}

export function assertNever(x: never): never {
	throw new Error('Unexpected object: ' + x);
}

import { Uttaksperiode, Tidsperiode, KravTilUttaksplan } from './perioder';

export interface Søknad {
	termin: Date;
	dekningsgrad: Dekningsgrad;
	ukerFørTermin: number;
	Uttaksplan?: Uttaksplan;
}

export interface Uttaksplan {
	periode: Tidsperiode;
	tilgjengeligeDager: number;
	fødselsdato: Date;
	perioderMor: Uttaksperiode[];
	perioderMedforelder: Uttaksperiode[];
}

export interface Uttaksregler {
	periode: Tidsperiode;
	krav: KravTilUttaksplan;
}
