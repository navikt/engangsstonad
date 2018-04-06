import * as moment from 'moment';
import { normaliserDato } from './';
import { Avgrensninger, Tidsperiode } from '../types';

export type DatoValidering =
    | 'datoErIkkeDefinert'
    | 'datoErUgyldig'
    | 'datoErFørMinDato'
    | 'datoErEtterMaksDato'
    | 'datoErIkkeUkedag'
    | 'datoErIUgyldigPeriode'
    | 'gyldig';

export const erDatoGyldig = (dato: Date | string | null | undefined, avgrensninger: Avgrensninger) => validerDato(dato, avgrensninger) !== undefined;

export const validerDato = (dato: Date | string | null | undefined, avgrensninger: Avgrensninger): DatoValidering => {
    if (dato === 'string' && dato.length < 8) {
        dato = undefined;
    }
    if (!dato) {
        return 'datoErIkkeDefinert';
    }
    if (typeof dato === 'string') {
        dato = moment(dato).toDate();
    }
    if (!moment(dato).isValid()) {
        return 'datoErUgyldig';
    }
    if (!erDatoEtterMinDato(dato, avgrensninger.minDato)) {
        return 'datoErFørMinDato';
    }
    if (!erDatoFørSluttdato(dato, avgrensninger.maksDato)) {
        return 'datoErEtterMaksDato';
    }
    if (!erDatoUkedag(dato)) {
        return 'datoErIkkeUkedag';
    }
    if (erDatoITidsperioder(dato, avgrensninger.ugyldigeTidsperioder)) {
        return 'datoErIUgyldigPeriode';
    }
    return 'gyldig';
};

export const erDatoDefinert = (dato: Date) => dato !== undefined && dato !== null;

export const erDatoEnDato = (dato: Date) => moment.isDate(dato);

export const erDatoEtterMinDato = (dato: Date, minDato?: Date) => {
    return !minDato || normaliserDato(dato).isSameOrAfter(normaliserDato(minDato));
};

export const erDatoFørSluttdato = (dato: Date, maksDato?: Date) => {
    return !maksDato || normaliserDato(dato).isSameOrBefore(normaliserDato(maksDato));
};

export const erDatoUkedag = (dato: Date) => {
    const dag = normaliserDato(dato).isoWeekday();
    return dag <= 5;
};

export const erDatoITidsperioder = (dato: Date, tidsperioder?: Tidsperiode[]) => {
    if (!tidsperioder || tidsperioder.length === 0) {
        return false;
    }
    const d = normaliserDato(dato);
    let gyldig: boolean = false;
    tidsperioder.forEach(periode => {
        if (gyldig && d.isSameOrAfter(normaliserDato(periode.startdato)) && d.isSameOrBefore(normaliserDato(periode.sluttdato))) {
            gyldig = true;
        }
    });
    return gyldig;
};

export const erDagTilgjengelig = (dato: Date, avgrensninger?: Avgrensninger) => !avgrensninger || validerDato(dato, avgrensninger);
