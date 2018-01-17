import { TidslinjeInnslag } from './types';

export const hentNesteInnslag = (idx: number, innslag: TidslinjeInnslag[]): TidslinjeInnslag | undefined => {
	if (idx < innslag.length - 1) {
		return innslag[idx + 1];
	}
	return undefined;
};
