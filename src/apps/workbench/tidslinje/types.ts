export enum InnslagType {
	'uttak',
	'terminEllerFodsel',
	'slutt'
}
export enum HendelseType {
	'termin',
	'fødsel'
}

export type Forelder = 'mor' | 'medforelder';

export interface TidslinjeInnslag {
	dato: Date;
	type: InnslagType;
	hendelser: Permisjonshendelse[];
}

export interface Permisjonshendelse {
	navn: string;
	forelder: Forelder;
	gradert?: boolean;
	type?: HendelseType;
}
