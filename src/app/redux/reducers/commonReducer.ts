import { CommonActionKeys, CommonActionTypes } from '../actions/common/commonActionDefinitions';
import { Språkkode } from '../../intl/types';

const initialState = (): CommonState => ({
    språkkode: 'nb',
    godkjentVilkar: false,
    bekreftetInformasjon: false,
});

export interface CommonState {
    språkkode: Språkkode;
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
            return { ...state, språkkode: action.språkkode };
        case CommonActionKeys.SET_GODKJENT_VILKAR:
            return { ...state, godkjentVilkar: action.godkjentVilkar };
        default:
            return state;
    }
};

export default commonReducer;
