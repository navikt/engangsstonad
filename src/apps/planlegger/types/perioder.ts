export interface Tidsperiode {
	start: Date;
	slutt: Date;
	uker?: number;
}

export enum Periodetype {
	'Stønadsperiode',
	'Utsettelse',
	'Opphold'
}

export enum StønadskontoType {
	/** Kvote forbeholdt mor */
	'Mødrekvote',
	/** Kvote forbehold medforelder */
	'Fedrekvote',
	/** Felleskvote som kan fordeles mellom mor og medforelder */
	'Fellesperiode',
	/** Når det kun er en forsørger/forelder */
	'Foreldrepenger'
}

export enum UtsettelseÅrsakType {
	'Ferie',
	'Arbeid',
	'SykdomSkade',
	'InnlagtBarn',
	'Annet'
}

export enum OppholdÅrsakType {
	'VenterSøknadFraAnnenForelder',
	'ManglendeSøktPeriode'
}

export enum Forelder {
	'mor',
	'medforelder'
}

interface Basisperiode {
	/** Hvilket tidsrom dette perioden er for */
	periode: Tidsperiode;
	/** Hvem som har perioden */
	forelder: Forelder;
}

interface Stønadsperiode extends Basisperiode {
	periodetype: Periodetype.Stønadsperiode;
}

interface Utsettelsesperiode extends Basisperiode {
	periodetype: Periodetype.Utsettelse;
}

interface Oppholdsperiode extends Basisperiode {
	periodetype: Periodetype.Opphold;
}

export interface Mødrekvote extends Stønadsperiode {
	stønadskonto: StønadskontoType.Mødrekvote;
	prosent?: number;
}

export interface Fedrekvote extends Stønadsperiode {
	stønadskonto: StønadskontoType.Fedrekvote;
	prosent?: number;
}

export interface Fellesperiode extends Stønadsperiode {
	stønadskonto: StønadskontoType.Fellesperiode;
	prosent?: number;
}

export interface Foreldrepenger extends Stønadsperiode {
	stønadskonto: StønadskontoType.Foreldrepenger;
}

export interface Ferie extends Utsettelsesperiode {
	årsak: UtsettelseÅrsakType.Ferie;
}

export interface Arbeid extends Utsettelsesperiode {
	årsak: UtsettelseÅrsakType.Arbeid;
	prosent: number;
}

export interface Sykdom extends Utsettelsesperiode {
	årsak: UtsettelseÅrsakType.SykdomSkade;
}

export interface InnlagtBarn extends Utsettelsesperiode {
	årsak: UtsettelseÅrsakType.InnlagtBarn;
}

export interface AnnenPeriode extends Utsettelsesperiode {
	årsak: UtsettelseÅrsakType.Annet;
}

export interface ManglendeSøktPeriode extends Oppholdsperiode {
	årsak: OppholdÅrsakType.ManglendeSøktPeriode;
}

export interface VenterSøknadFraAnnenForelder extends Oppholdsperiode {
	årsak: OppholdÅrsakType.ManglendeSøktPeriode;
}

/** Alle gyldige periodetyper som en kan fylle utaksplanen med */
export type Uttaksperiode =
	| Mødrekvote
	| Fedrekvote
	| Fellesperiode
	| Foreldrepenger
	| Ferie
	| Arbeid
	| Sykdom
	| InnlagtBarn
	| AnnenPeriode
	| ManglendeSøktPeriode
	| VenterSøknadFraAnnenForelder;

export interface KravTilUttaksplan {
	dagerMødrekvoteFørTerming: number;
	dagerMødrekvoteEtterFødsel: number;
	dagerFedrekvote: number;
}
