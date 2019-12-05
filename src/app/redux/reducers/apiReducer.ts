import { ApiActionKeys, ApiActionTypes } from '../actions/api/apiActionDefinitions';
import Person from '../../types/domain/Person';
import Kvittering from 'app/types/services/Kvittering';

const getDefaultState = (): ApiReducerState => ({
    isLoadingPerson: false,
    søknadSendt: false,
    søknadSendingInProgress: false,
    kvittering: undefined,
    person: undefined,
    isLoadingAppState: false,
    sessionHasExpired: false
});

export interface ApiReducerState {
    isLoadingPerson: boolean;
    søknadSendt: boolean;
    søknadSendingInProgress: boolean;
    kvittering?: Kvittering;
    person?: Person;
    isLoadingAppState: boolean;
    sessionHasExpired: boolean;
}

const apiReducer = (state = getDefaultState(), action: ApiActionTypes) => {
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
    }
    return state;
};

export default apiReducer;
