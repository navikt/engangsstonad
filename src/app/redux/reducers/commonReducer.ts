import { CommonActionKeys, CommonActionTypes } from '../actions/common/commonActionDefinitions';

const getDefaultState = () => ({
    language: 'nb',
    godkjentVilkar: true,
    bekreftetInformasjon: false,
    barnErFodt: null
});

const commonReducer = (state = getDefaultState(), action: CommonActionTypes) => {
    switch (action.type) {
        case CommonActionKeys.SET_BEKREFTET_INFORMASJON:
            return { ...state, bekreftetInformasjon: action.bekreftetInformasjon };
        case CommonActionKeys.SET_LANGUAGE:
            return { ...state, language: action.language };
        case CommonActionKeys.SET_GODKJENT_VILKAR:
            return { ...state, godkjentVilkar: action.godkjentVilkar };
    }
    return state;
};

export default commonReducer;
