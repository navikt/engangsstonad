import { CommonActionKeys, CommonActionTypes } from './commonActionDefinitions';
import { Language } from 'intl/IntlProvider';

export function setBekreftetInformasjon(bekreftetInformasjon: boolean): CommonActionTypes {
    return {
        type: CommonActionKeys.SET_BEKREFTET_INFORMASJON,
        bekreftetInformasjon,
    };
}

export function setGodkjentVilkar(godkjentVilkar: boolean): CommonActionTypes {
    return {
        type: CommonActionKeys.SET_GODKJENT_VILKAR,
        godkjentVilkar,
    };
}

export function setLanguage(language: Language): CommonActionTypes {
    return {
        type: CommonActionKeys.SET_LANGUAGE,
        language,
    };
}

export default {
    setBekreftetInformasjon,
    setGodkjentVilkar,
    setLanguage,
};
