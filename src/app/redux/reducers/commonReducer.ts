import { CommonActionKeys, CommonActionTypes } from '../actions/common/commonActionDefinitions';
import { Language } from 'intl/IntlProvider';

const initialState = (): CommonState => ({
    language: Language.BOKMÅL,
    godkjentVilkår: false,
    bekreftetInformasjon: false
});

export interface CommonState {
    language: Language;
    godkjentVilkår: boolean;
    bekreftetInformasjon: boolean;
}

const commonReducer = (state = initialState(), action: CommonActionTypes) => {
    switch (action.type) {
        case CommonActionKeys.SET_BEKREFTET_INFORMASJON:
            return {
                ...state,
                bekreftetInformasjon: action.bekreftetInformasjon
            };
        case CommonActionKeys.SET_LANGUAGE:
            return { ...state, language: action.language };
        case CommonActionKeys.SET_GODKJENT_VILKÅR:
            return { ...state, godkjentVilkår: action.godkjentVilkår };
        default:
            return state;
    }
};

export default commonReducer;
