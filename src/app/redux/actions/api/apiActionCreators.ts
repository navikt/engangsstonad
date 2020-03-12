import { ApiActionKeys, ApiActionTypes } from './apiActionDefinitions';
import { EngangssoknadSoknadDto } from '../../../types/domain/EngangsstonadSoknad';
import Kvittering from 'app/types/services/Kvittering';
import { Søkerinfo } from 'app/types/domain/Søkerinfo';

export function getPerson(): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_SØKERINFO
    };
}

export function getPersonSuccess(søkerinfo: Søkerinfo): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_SØKERINFO_SUCCESS,
        søkerinfo
    };
}

// tslint:disable-next-line:no-any
export function getPersonFailed(error: any): ApiActionTypes {
    return {
        type: ApiActionKeys.GET_SØKERINFO_FAILED,
        error
    };
}

export function sendSoknad(soknad: EngangssoknadSoknadDto): ApiActionTypes {
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
