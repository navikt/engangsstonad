import * as moment from 'moment';
import { Tidsperiode } from 'app/types/domain/InformasjonOmUtenlandsopphold';

export const getUkerOgDagerFromDager = (dager: number): { uker: number; dager: number } => {
    const uker = Math.floor(dager / 5);
    return {
        dager: dager - uker * 5,
        uker
    };
};

export const formatDate = (dato?: string) => {
    return moment(dato, moment.HTML5_FMT.DATE, true).format('DD.MM.YYYY');
};

export const prettifyTidsperiode = (tidsperiode: Partial<Tidsperiode>) => {
    return `${formatDate(tidsperiode.fom)} - ${formatDate(tidsperiode.tom) || 'pågående'}`;
};

