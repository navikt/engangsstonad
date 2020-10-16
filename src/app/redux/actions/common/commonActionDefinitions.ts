import { Språkkode } from 'intl/types';

export enum CommonActionKeys {
    'SET_BEKREFTET_INFORMASJON' = 'setBekreftetInformasjon',
    'SET_GODKJENT_VILKAR' = 'setGodkjentVilkar',
    'SET_LANGUAGE' = 'setLanguage',
}

interface SetBekreftetInformasjon {
    type: CommonActionKeys.SET_BEKREFTET_INFORMASJON;
    bekreftetInformasjon: boolean;
}

interface SetGodkjentVilkar {
    type: CommonActionKeys.SET_GODKJENT_VILKAR;
    godkjentVilkar: boolean;
}

interface SetLanguage {
    type: CommonActionKeys.SET_LANGUAGE;
    språkkode: Språkkode;
}

export type CommonActionTypes = SetBekreftetInformasjon | SetGodkjentVilkar | SetLanguage;
