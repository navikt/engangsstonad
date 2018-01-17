import { Hendelse } from '../types';

export const hentNesteInnslag = (idx: number, innslag: Hendelse[]): Hendelse | undefined => {
	if (idx < innslag.length - 1) {
		return innslag[idx + 1];
	}
	return undefined;
};
