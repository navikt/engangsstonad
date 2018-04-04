import { ApiActionKeys, ApiActionTypes } from './apiActionDefinitions';
import Person from '../../../types/domain/Person';
import PersonRequest from '../../../types/services/PersonRequest';
import { EngangsstonadSoknadResponse } from '../../../types/services/EngangsstonadSoknadResponse';
import EngangsstonadSoknad from '../../../types/domain/EngangsstonadSoknad';

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

export function sendSoknad(soknad: EngangsstonadSoknad): ApiActionTypes {
    return {
        type: ApiActionKeys.SEND_SOKNAD,
        soknad,
    };
}

export function sendSoknadSuccess(soknad: EngangsstonadSoknadResponse): ApiActionTypes {
    return {
        type: ApiActionKeys.SEND_SOKNAD_SUCCESS,
        soknad
    };
}

// tslint:disable-next-line:no-any
export function sendSoknadFailed(error: any): ApiActionTypes {
    return {
        type: ApiActionKeys.SEND_SOKNAD_FAILED,
        error
    };
}

export default {
    getPerson,
    getPersonSuccess,
    getPersonFailed,
    sendSoknad,
    sendSoknadSuccess,
    sendSoknadFailed
};
