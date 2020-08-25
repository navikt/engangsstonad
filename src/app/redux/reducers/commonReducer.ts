import { CommonActionKeys, CommonActionTypes } from '../actions/common/commonActionDefinitions';
import { Language } from 'intl/IntlProvider';

const initialState = (): CommonState => ({
    language: Language.BOKMÅL,
    godkjentVilkar: false,
    bekreftetInformasjon: false,
});

export interface CommonState {
    language: Language;
    godkjentVilkar: boolean;
    bekreftetInformasjon: boolean;
}

const commonReducer = (state = initialState(), action: CommonActionTypes) => {
    switch (action.type) {
        case CommonActionKeys.SET_BEKREFTET_INFORMASJON:
            return {
                ...state,
                bekreftetInformasjon: action.bekreftetInformasjon,
            };
        case CommonActionKeys.SET_LANGUAGE:
            return { ...state, language: action.language };
        case CommonActionKeys.SET_GODKJENT_VILKAR:
            return { ...state, godkjentVilkar: action.godkjentVilkar };
        default:
            return state;
    }
};

export default commonReducer;
