import * as moment from 'moment';

export const isValidISODate = (isoDato: string) =>
    !!(isoDato && moment(isoDato, moment.ISO_8601).isValid());

export const dateToISODate = (dato: string) => {
    const parsetDato = moment(dato);
    return dato && parsetDato.isValid() ? parsetDato.toISOString() : '';
};

export const ISODateToMaskedInput = (dato: string) => {
    const parsetDato = moment(dato);
    return dato && parsetDato.isValid() ? parsetDato.format('DD.MM.YYYY') : '';
};

export const datePickerToISODate = (dato: string) => {
    const parsetDato = moment.utc(dato, 'DD.MM.YYYY', true);
    return parsetDato.isValid() ? parsetDato.toISOString() : '';
};

export const datoIsSet = (datoer: (string | undefined)[]) => {
    return (
        datoer.length > 0 &&
        !datoer.includes(undefined as any) &&
        !datoer.includes('' as any)
    );
};
