import Person from '../../types/domain/Person';
import { History } from 'history';
import { erOver18ÅrSiden, erMann, personFinnes } from 'util/validation/validationUtils';

export default (person: Person, history: History) => {
    if (!personFinnes(person)) {
        return history.push('/engangsstonad/personFinnesIkke');
    }

    if (erMann(person)) {
        return history.push('/engangsstonad/erMann');
    }

    if (!erOver18ÅrSiden(person.fødselsdato) && person.kjønn !== 'M') {
        history.push('/engangsstonad/underAge');
    }
};
