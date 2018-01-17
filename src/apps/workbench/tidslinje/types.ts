export enum InnslagType {
	'start',
	'uttak',
	'terminEllerFodsel',
	'slutt'
}
export type Forelder = 'mor' | 'medforelder';

export interface TidslinjeInnslag {
	dato: Date;
	type: InnslagType;
	hendelser: Permisjonshendelse[];
}

export interface Permisjonshendelse {
	navn: string;
	forelder?: Forelder;
	gradert?: boolean;
}
