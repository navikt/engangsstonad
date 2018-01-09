export * from './perioder';

export enum Dekningsgrad {
	'80%',
	'100%'
}

import { Uttaksperiode, Tidsperiode } from './perioder';

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
