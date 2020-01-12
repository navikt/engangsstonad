import * as moment from 'moment';
import Person from '../../types/domain/Person';

const todaysDate = moment();
const ukerAaTrekkeFraTerminDato = 18;
const ekstraDagerAaTrekkeFraTerminDato = 3;
const dagerForTerminbekreftelse = ukerAaTrekkeFraTerminDato * 7 + ekstraDagerAaTrekkeFraTerminDato;

export const erIUke22Pluss3 = (dato: string) => {
    const terminDato = moment(dato);
    const uke22Pluss3 = terminDato.subtract(dagerForTerminbekreftelse, 'days');
    return moment.max(todaysDate.startOf('day'), uke22Pluss3.startOf('day')) === todaysDate;
};

export const erMindreEnn3UkerSiden = (dato: string) => {
    const terminDato = moment(dato);
    const datoFor3UkerSiden = moment()
        .startOf('day')
        .subtract(21, 'days');
    return moment.max(terminDato, datoFor3UkerSiden) === terminDato;
};

export const utstedtDatoErIUke22 = (utstedtDatoString: string, terminDatoString: string) => {
    const utstedtDato = moment(utstedtDatoString).startOf('day');
    const terminDato = moment(terminDatoString).startOf('day');
    const uke22 = terminDato.subtract(dagerForTerminbekreftelse, 'days');
    return moment.max(uke22, utstedtDato).isSame(utstedtDato);
};

export const idagEllerTidligere = (dato: string) => {
    const utstedtDato = moment(dato).startOf('day');
    const tomorrow = moment()
        .add(1, 'day')
        .startOf('day');
    return moment.max(utstedtDato, tomorrow) === tomorrow;
};

export const erMyndig = (person: Person) => {
    const now = moment();
    const momentDate = moment(person.fødselsdato);
    return now.diff(momentDate, 'years') >= 18;
};

export const erMann = (person: Person) => person.kjønn === 'M';

export const getFørsteMuligeTermindato = () =>
    moment()
        .subtract(21, 'days')
        .startOf('day')
        .toDate();

/**
 * Siste mulige termindato ut fra dagens dato
 * - dato må bekrefte at bruker er minst i uke 22
 */
export const getSisteMuligeTermindato = () =>
    moment()
        .add(dagerForTerminbekreftelse - 1, 'days')
        .endOf('day')
        .toDate();

export const getForsteMuligeTerminbekreftesesdato = (termindato?: Date | string): Date => {
    return termindato
        ? moment(termindato)
              .subtract(dagerForTerminbekreftelse - 1, 'days')
              .toDate()
        : moment()
              .subtract(1, 'years')
              .startOf('day')
              .toDate();
};

export const getSisteMuligeTerminbekreftesesdato = (termindato?: Date | string) =>
    moment(new Date())
        .endOf('day')
        .toDate();
