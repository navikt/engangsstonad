import { ApiActionKeys, ApiActionTypes } from '../actions/api/apiActionDefinitions';

const getDefaultState = () => ({
    isLoadingPerson: false
});

const apiReducer = (state = getDefaultState(), action: ApiActionTypes) => {
    switch (action.type) {
        case ApiActionKeys.GET_PERSON:
            return { ...state, params: action.params, isLoadingPerson: true };
        case ApiActionKeys.GET_PERSON_SUCCESS:
            return { ...state, person: action.person, isLoadingPerson: false };
        case ApiActionKeys.GET_PERSON_FAILED:
            return { ...state, reason: action.reason, isLoadingPerson: false };
        case ApiActionKeys.SEND_SOKNAD:
            return { ...state, soknad: action.soknad };
        case ApiActionKeys.SEND_SOKNAD_SUCCESS:
            return { ...state, soknad: action.soknad };
        case ApiActionKeys.SEND_SOKNAD_FAILED:
            return { ...state, reason: action.reason };
    }
    return state;
};

export default apiReducer;
