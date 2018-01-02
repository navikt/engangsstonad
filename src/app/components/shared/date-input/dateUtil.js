import moment from 'moment';

export const erGyldigISODato = (isoDato) => !!(isoDato && moment(isoDato, moment.ISO_8601).isValid());

export const dateToISODate = (dato) => {
    const parsetDato = moment(dato);
    return dato && parsetDato.isValid() ? parsetDato.toISOString() : '';
};

export const ISODateToDatePicker = (dato) => {
    const parsetDato = moment(dato);
    return dato && parsetDato.isValid() ? parsetDato.format('DD.MM.YYYY') : '';
};

export const datePickerToISODate = (dato) => {
    const parsetDato = moment.utc(dato, 'DD.MM.YYYY', true);
    return parsetDato.isValid() ? parsetDato.toISOString() : '';
};

// TODO rydde bort metodene under
export const stopEvent = (event) => {
    try {
        event.nativeEvent.stopImmediatePropagation();
    } catch (e) {
        event.stopPropagation();
    }
};

export function autobind(ctx) {
    Object.getOwnPropertyNames(ctx.constructor.prototype)
        .filter((prop) => typeof ctx[prop] === 'function')
        .forEach((method) => {
            // eslint-disable-next-line
            ctx[method] = ctx[method].bind(ctx);
        });
}
