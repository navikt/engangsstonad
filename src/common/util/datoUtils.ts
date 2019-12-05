/* tslint:disable */
import { startOfDay } from 'date-fns';
import moment, { Moment } from 'moment';

export const normaliserDato = (dato: Date): Date => startOfDay(dato);


export function år(dato: Moment): string {
    return moment.utc(dato).format('YYYY');
}

export const getUkerOgDagerFromDager = (dager: number): { uker: number; dager: number } => {
    const uker = Math.floor(dager / 5);
    return {
        dager: dager - uker * 5,
        uker
    };
};

export const dateToISOFormattedDateString = (date?: Date) => (date ? moment.utc(date).format('YYYY-MM-DD') : undefined);
