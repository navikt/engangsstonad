import { ApiActionKeys, ApiActionTypes } from '../actions/api/apiActionDefinitions';
import Person from '../../types/domain/Person';
import Kvittering from 'app/types/services/Kvittering';
import { AxiosResponse } from 'axios';

const initialState = (): ApiState => ({
    isLoadingPerson: true,
    søknadSendt: false,
    søknadSendingInProgress: false,
    kvittering: undefined,
    person: undefined,
    sessionHasExpired: false,
    error: undefined
});

export interface ApiState {
    isLoadingPerson: boolean;
    søknadSendt: boolean;
    søknadSendingInProgress: boolean;
    kvittering?: Kvittering;
    person?: Person;
    sessionHasExpired: boolean;
    error: AxiosResponse | Error | undefined;
}

const apiReducer = (state = initialState(), action: ApiActionTypes) => {
    switch (action.type) {
        case ApiActionKeys.GET_PERSON:
            return { ...state, params: action.params, isLoadingPerson: true };
        case ApiActionKeys.GET_PERSON_SUCCESS:
            return { ...state, person: action.person, isLoadingPerson: false };
        case ApiActionKeys.GET_PERSON_FAILED:
            return {
                ...state,
                error: action.error.response,
                isLoadingPerson: false
            };
        case ApiActionKeys.SEND_SOKNAD:
            return {
                ...state,
                soknad: action.soknad,
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
