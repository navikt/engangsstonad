import {
    CommonActionKeys,
    CommonActionTypes
} from '../actions/common/commonActionDefinitions';
import {
    ApiActionKeys,
    GetAppStateSuccess
} from 'actions/api/apiActionDefinitions';

const getDefaultState = (): CommonState => ({
    language: 'nb',
    godkjentVilkar: false,
    bekreftetInformasjon: false,

});

export interface CommonState {
    language: string;
    godkjentVilkar: boolean;
    bekreftetInformasjon: boolean;
}

const commonReducer = (
    state = getDefaultState(),
    action: CommonActionTypes | GetAppStateSuccess
) => {
    switch (action.type) {
        case CommonActionKeys.SET_BEKREFTET_INFORMASJON:
            return {
                ...state,
                bekreftetInformasjon: action.bekreftetInformasjon
            };
        case CommonActionKeys.SET_LANGUAGE:
            return { ...state, language: action.language };
        case CommonActionKeys.SET_GODKJENT_VILKAR:
            return { ...state, godkjentVilkar: action.godkjentVilkar };
        case ApiActionKeys.GET_APP_STATE_SUCCESS:
            return { ...state, ...action.appState.common };
    }
    return state;
};

export default commonReducer;
