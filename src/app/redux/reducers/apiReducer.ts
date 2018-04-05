import { ApiActionKeys, ApiActionTypes } from '../actions/api/apiActionDefinitions';

const getDefaultState = () => ({
    isLoadingPerson: false,
    søknadSendt: false,
    søknadSendingInProgress: false
});

const apiReducer = (state = getDefaultState(), action: ApiActionTypes) => {
    switch (action.type) {
        case ApiActionKeys.GET_PERSON:
            return { ...state, params: action.params, isLoadingPerson: true };
        case ApiActionKeys.GET_PERSON_SUCCESS:
            return { ...state, person: action.person, isLoadingPerson: false };
        case ApiActionKeys.GET_PERSON_FAILED:
            return { ...state, error: action.error.response, isLoadingPerson: false };
        case ApiActionKeys.SEND_SOKNAD:
            return { ...state, soknad: action.soknad, søknadSendingInProgress: true };
        case ApiActionKeys.SEND_SOKNAD_SUCCESS:
            return { ...state, soknad: action.soknad, søknadSendt: true, søknadSendingInProgress: false };
        case ApiActionKeys.SEND_SOKNAD_FAILED:
            return { ...state, error: action.error.response, søknadSendt: true, søknadSendingInProgress: false };
    }
    return state;
};

export default apiReducer;
