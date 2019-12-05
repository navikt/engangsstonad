import {
    CommonActionKeys,
    CommonActionTypes
} from '../actions/common/commonActionDefinitions';
import { Language } from 'intl/IntlProvider';

const getDefaultState = (): CommonState => ({
    language: Language.BOKMÅL,
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
    action: CommonActionTypes
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
    }
    return state;
};

export default commonReducer;
