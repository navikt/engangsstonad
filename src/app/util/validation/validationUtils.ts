import * as moment from 'moment';

const todaysDate = moment();

const ukerAaTrekkeFraTerminDato = 14;
const ekstraDagerAaTrekkeFraTerminDato = 3;

export const erIUke26Pluss3 = (dato: string) => {
    const terminDato = moment(dato);
    const uke26Pluss3 = terminDato.subtract((ukerAaTrekkeFraTerminDato * 7) + ekstraDagerAaTrekkeFraTerminDato, 'days');
    return moment.max(todaysDate, uke26Pluss3) === todaysDate;
};

export const erMindreEnn3UkerSiden = (dato: string) => {
    const terminDato = moment(dato);
    const datoFor3UkerSiden = moment().startOf('day').subtract(21, 'days');
    return moment.max(terminDato, datoFor3UkerSiden) === terminDato;
};

export const utstedtDatoErIUke26 = (utstedtDatoString: string, terminDatoString: string) => {
    const utstedtDato = moment(utstedtDatoString);
    const terminDato = moment(terminDatoString);
    const uke26 = terminDato.subtract(ukerAaTrekkeFraTerminDato * 7, 'days');
    return moment.max(uke26, utstedtDato) === utstedtDato;
};

export const idagEllerTidligere = (dato: string) => {
    const utstedtDato = moment(dato).startOf('day');
    const tomorrow = moment().add(1, 'day').startOf('day');
    return moment.max(utstedtDato, tomorrow) === tomorrow;
};
