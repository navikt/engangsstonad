import moment from 'moment';

export const isValidISODate = (isoDato) =>
	!!(isoDato && moment(isoDato, moment.ISO_8601).isValid());

export const dateToISODate = (dato) => {
	const parsetDato = moment(dato);
	return dato && parsetDato.isValid() ? parsetDato.toISOString() : '';
};

export const ISODateToMaskedInput = (dato) => {
	const parsetDato = moment(dato);
	return dato && parsetDato.isValid() ? parsetDato.format('DD.MM.YYYY') : '';
};

export const datePickerToISODate = (dato) => {
	const parsetDato = moment.utc(dato, 'DD.MM.YYYY', true);
	return parsetDato.isValid() ? parsetDato.toISOString() : '';
};
