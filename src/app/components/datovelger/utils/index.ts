import * as moment from 'moment';
import { Moment } from 'moment';

export * from './kalenderFokusUtils';

export const normaliserDato = (d: Date): Moment => moment(d).startOf('day');

export const formatDateInputValue = (date?: Date) => {
    return date ? moment(date).format('DD.MM.YYYY') : '';
};

export const formaterDayAriaLabel = (dato: Date, locale: string) => {
    return moment(dato).format('DD.MM.YYYY, dddd');
};

export const dagDatoNøkkel = (dato: Date) => `${moment(dato).format('DD.MM.YYYY')}`;

export const getMånedDiff = (måned1: Date, måned2: Date) =>
    moment(måned1)
        .startOf('month')
        .diff(moment(måned2).startOf('month'), 'months');

export const erMånedTilgjengelig = (måned: Date, avgrensninger?: { min?: Date; maks?: Date }): boolean => {
    if (!avgrensninger) {
        return true;
    }
    const mnd = moment(måned);
    const { min, maks } = avgrensninger;
    const erEtterMin = min ? mnd.endOf('month').isAfter(moment(min).startOf('month')) : true;
    const erFørMaks = maks ? mnd.startOf('month').isBefore(moment(maks).endOf('month')) : true;
    return erEtterMin && erFørMaks;
};

// export function getSammeDatoIMåned(
// 	dato: Date,
// 	måned: Date,
// 	nesteMåned: Date
// ): Date {
// 	return moment(dato)
// 		.add(getMånedDiff(nesteMåned, måned), 'months')
// 		.toDate();
// }
