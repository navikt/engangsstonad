import { ApiActionKeys, ApiActionTypes } from './apiActionDefinitions';
import Person from '../../../types/domain/Person';
import PersonRequest from '../../../types/services/PersonRequest';
import EngangsstonadSoknad from '../../../types/domain/EngangsstonadSoknad';
import { AppState } from 'common/redux/types';
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

export function sendSoknad(soknad: EngangsstonadSoknad): ApiActionTypes {
    return {
        type: ApiActionKeys.SEND_SOKNAD,
        soknad
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

export function saveAppState(appState: AppState): ApiActionTypes {
    return {
        type: ApiActionKeys.SAVE_APP_STATE,
        appState
    };
}

export function saveAppStateSuccess(): ApiActionTypes {
    return {
        type: ApiActionKeys.SAVE_APP_STATE_SUCCESS
    };
}

// tslint:disable-next-line:no-any
export function saveAppStateFailed(error: any): ApiActionTypes {
    return {
        type: ApiActionKeys.SAVE_APP_STATE_FAILED,
        error
    };
}

export function getAppState(): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_APP_STATE
    };
}

export function getAppStateSuccess(appState: AppState): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_APP_STATE_SUCCESS,
        appState
    };
}

export function getAppStateFailed(error: any): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_APP_STATE_FAILED,
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
    saveAppState,
    saveAppStateSuccess,
    saveAppStateFailed,
    getAppState,
    getAppStateSuccess,
    getAppStateFailed,
    sessionExpired
};