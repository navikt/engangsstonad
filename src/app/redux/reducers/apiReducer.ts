import { ApiActionKeys, ApiActionTypes } from '../actions/api/apiActionDefinitions';
import Kvittering from 'app/types/services/Kvittering';
import { AxiosResponse } from 'axios';
import { Søkerinfo } from 'app/types/domain/Søkerinfo';

const initialState = (): ApiState => ({
    isLoadingPerson: true,
    søknadSendt: false,
    søknadSendingInProgress: false,
    kvittering: undefined,
    søkerinfo: undefined,
    sessionHasExpired: false,
    error: undefined
});

export interface ApiState {
    isLoadingPerson: boolean;
    søknadSendt: boolean;
    søknadSendingInProgress: boolean;
    kvittering?: Kvittering;
    søkerinfo?: Søkerinfo;
    sessionHasExpired: boolean;
    error: AxiosResponse | Error | undefined;
}

const apiReducer = (state = initialState(), action: ApiActionTypes): ApiState => {
    switch (action.type) {
        case ApiActionKeys.GET_SØKERINFO:
            return { ...state, isLoadingPerson: true };
        case ApiActionKeys.GET_SØKERINFO_SUCCESS:
            return { ...state, søkerinfo: action.søkerinfo, isLoadingPerson: false };
        case ApiActionKeys.GET_SØKERINFO_FAILED:
            return {
                ...state,
                error: action.error.response,
                isLoadingPerson: false
            };
        case ApiActionKeys.SEND_SOKNAD:
            return {
                ...state,
                søknadSendingInProgress: true
            };
        case ApiActionKeys.SEND_SOKNAD_SUCCESS:
            return {
                ...state,
                kvittering: action.kvittering,
                søknadSendt: true,
                søknadSendingInProgress: false
            };
        case ApiActionKeys.SEND_SOKNAD_FAILED:
            return {
                ...state,
                error: action.error.response,
                søknadSendt: true,
                søknadSendingInProgress: false
            };
        case ApiActionKeys.SESSION_EXPIRED:
            return {
                ...state,
                sessionHasExpired: true
            };
        default:
            return state;
    }
};

export default apiReducer;
