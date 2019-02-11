import {
    ApiActionKeys,
    ApiActionTypes
} from '../actions/api/apiActionDefinitions';
import Person from '../../types/domain/Person';
import Kvittering from 'app/types/services/Kvittering';

const getDefaultState = (): ApiReducerState => ({
    isLoadingPerson: false,
    søknadSendt: false,
    søknadSendingInProgress: false,
    kvittering: undefined,
    person: undefined,
    mellomlagretSøknad: false,
    isLoadingAppState: false
});

export interface ApiReducerState {
    isLoadingPerson: boolean;
    søknadSendt: boolean;
    søknadSendingInProgress: boolean;
    kvittering?: Kvittering;
    person?: Person;
    mellomlagretSøknad: boolean;
    isLoadingAppState: boolean;
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
        case ApiActionKeys.GET_APP_STATE:
            return {
                ...state,
                isLoadingAppState: true
            };
        case ApiActionKeys.GET_APP_STATE_SUCCESS:
            return {
                ...state,
                isLoadingAppState: false,
                mellomlagretSøknad: true
            };
        case ApiActionKeys.GET_APP_STATE_FAILED:
            return {
                ...state,
                isLoadingAppState: false
            };
    }
    return state;
};

export default apiReducer;
