import { ApiActionKeys, ApiActionTypes } from '../actions/api/apiActionDefinitions';

const apiReducer = (state = {}, action: ApiActionTypes) => {
    switch (action.type) {
        case ApiActionKeys.GET_PERSON_REQUESTED:
            return { ...state, params: action.params };
        case ApiActionKeys.GET_PERSON_SUCCESS:
            return { ...state, person: action.person };
        case ApiActionKeys.GET_PERSON_FAILED:
            return { ...state, reason: action.reason };
        case ApiActionKeys.SEND_SOKNAD_REQUESTED:
            return { ...state, soknad: action.soknad };
        case ApiActionKeys.SEND_SOKNAD_SUCCESS:
            return { ...state, soknad: action.soknad };
        case ApiActionKeys.SEND_SOKNAD_FAILED:
            return { ...state, reason: action.reason };
    }
    return state;
};

export default apiReducer;
