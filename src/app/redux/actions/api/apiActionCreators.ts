import { ApiActionKeys, ApiActionTypes } from './apiActionDefinitions';
import Person from '../../../types/domain/Person';
import PersonRequest from '../../../types/services/PersonRequest';
import EngangsstonadSoknad from '../../../types/domain/EngangsstonadSoknad';
import Kvittering from 'app/types/services/Kvittering';

export function getPerson(person?: PersonRequest): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_PERSON,
        params: person
    };
}

export function getPersonSuccess(person: Person): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_PERSON_SUCCESS,
        person
    };
}

// tslint:disable-next-line:no-any
export function getPersonFailed(error: any): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_PERSON_FAILED,
        error
    };
}

export function sendSoknad(soknad: EngangsstonadSoknad, språkkode: string): ApiActionTypes {
    return {
        type: ApiActionKeys.SEND_SOKNAD,
        soknad,
        språkkode
    };
}

export function sendSoknadSuccess(kvittering: Kvittering): ApiActionTypes {
    return {
        type: ApiActionKeys.SEND_SOKNAD_SUCCESS,
        kvittering
    };
}

// tslint:disable-next-line:no-any
export function sendSoknadFailed(error: any): ApiActionTypes {
    return {
        type: ApiActionKeys.SEND_SOKNAD_FAILED,
        error
    };
}

export function sessionExpired(): ApiActionTypes {
    return {
        type: ApiActionKeys.SESSION_EXPIRED
    };
}

export default {
    getPerson,
    getPersonSuccess,
    getPersonFailed,
    sendSoknad,
    sendSoknadSuccess,
    sendSoknadFailed,
    sessionExpired
};