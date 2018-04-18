import * as moment from 'moment';
import Person from '../../types/domain/Person';

const todaysDate = moment();

const ukerAaTrekkeFraTerminDato = 14;
const ekstraDagerAaTrekkeFraTerminDato = 3;

export const erIUke26Pluss3 = (dato: string) => {
    const terminDato = moment(dato);
    const uke26Pluss3 = terminDato.subtract(ukerAaTrekkeFraTerminDato * 7 + ekstraDagerAaTrekkeFraTerminDato, 'days');
    return moment.max(todaysDate.startOf('day'), uke26Pluss3.startOf('day')) === todaysDate;
};

export const erMindreEnn3UkerSiden = (dato: string) => {
    const terminDato = moment(dato);
    const datoFor3UkerSiden = moment()
        .startOf('day')
        .subtract(21, 'days');
    return moment.max(terminDato, datoFor3UkerSiden) === terminDato;
};

export const utstedtDatoErIUke26 = (utstedtDatoString: string, terminDatoString: string) => {
    const utstedtDato = moment(utstedtDatoString).startOf('day');
    const terminDato = moment(terminDatoString).startOf('day');
    const uke26 = terminDato.subtract(ukerAaTrekkeFraTerminDato * 7, 'days');
    return moment.max(uke26, utstedtDato) === utstedtDato;
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
    return now.diff(momentDate, 'years') > 18;
};

export const erMann = (person: Person) => person.kjønn === 'M';

export const harPersonData = (person?: Person) => person !== undefined && person.fødselsdato !== undefined;

export const getFørsteMuligeTermindato = () =>
    moment()
        .add(-3, 'weeks')
        .startOf('day')
        .toDate();

/**
 * Siste mulige termindato ut fra dagens dato
 * - dato må bekrefte at bruker er minst i uke 26
 */
export const getSisteMuligeTermindato = () =>
    moment()
        .add(ukerAaTrekkeFraTerminDato, 'weeks')
        .subtract(1 * ekstraDagerAaTrekkeFraTerminDato, 'days')
        .endOf('day')
        .toDate();

export const getForsteMuligeTerminbekreftesesdato = (termindato?: Date): Date =>
    termindato
        ? moment(termindato)
              .subtract(ukerAaTrekkeFraTerminDato * 7 - 1, 'days')
              .toDate()
        : moment()
              .subtract(1, 'years')
              .startOf('day')
              .toDate();

export const getSisteMuligeTerminbekreftesesdato = (termindato?: Date) =>
    moment(termindato || new Date())
        .endOf('day')
        .toDate();
