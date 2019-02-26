import Person from '../../../types/domain/Person';
import { default as EngangsstonadSoknad } from '../../../types/domain/EngangsstonadSoknad';
import PersonRequest from '../../../types/services/PersonRequest';
import { AppState } from 'common/redux/types';
import Kvittering from 'app/types/services/Kvittering';

export enum ApiActionKeys {
    'GET_PERSON' = 'getPerson',
    'GET_PERSON_SUCCESS' = 'getPersonSuccess',
    'GET_PERSON_FAILED' = 'getPersonFailed',
    'SEND_SOKNAD' = 'sendSoknad',
    'SEND_SOKNAD_SUCCESS' = 'sendSoknadSuccess',
    'SEND_SOKNAD_FAILED' = 'sendSoknadFailed',
    'SAVE_APP_STATE' = 'saveAppState',
    'SAVE_APP_STATE_SUCCESS' = 'saveAppStateSuccess',
    'SAVE_APP_STATE_FAILED' = 'saveAppStateFailed',
    'GET_APP_STATE' = 'getAppState',
    'GET_APP_STATE_SUCCESS' = 'getAppStateSuccess',
    'GET_APP_STATE_FAILED' = 'getAppStateFailed',
    'SESSION_EXPIRED' = 'sessionExpired'
}

interface SessionExpired {
    type: ApiActionKeys.SESSION_EXPIRED;
}

interface GetPerson {
    type: ApiActionKeys.GET_PERSON;
    params?: PersonRequest;
}

interface GetPersonSuccess {
    type: ApiActionKeys.GET_PERSON_SUCCESS;
    person: Person;
}

interface GetPersonFailed {
    type: ApiActionKeys.GET_PERSON_FAILED;
    // tslint:disable-next-line:no-any
    error: any;
}

interface SendSoknad {
    type: ApiActionKeys.SEND_SOKNAD;
    soknad: EngangsstonadSoknad;
}

interface SendSoknadSuccess {
    type: ApiActionKeys.SEND_SOKNAD_SUCCESS;
    kvittering: Kvittering;
}

interface SendSoknadFailed {
    type: ApiActionKeys.SEND_SOKNAD_FAILED;
    // tslint:disable-next-line:no-any
    error: any;
}

export interface SaveAppState {
    type: ApiActionKeys.SAVE_APP_STATE;
    appState: AppState;
}

interface SaveAppStateSuccess {
    type: ApiActionKeys.SAVE_APP_STATE_SUCCESS;
}

interface SaveAppStateFailed {
    type: ApiActionKeys.SAVE_APP_STATE_FAILED;
    // tslint:disable-next-line:no-any
    error: any;
}

export interface GetAppState {
    type: ApiActionKeys.GET_APP_STATE;
}

export interface GetAppStateSuccess {
    type: ApiActionKeys.GET_APP_STATE_SUCCESS;
    appState: AppState;
}

interface GetAppStateFailed {
    type: ApiActionKeys.GET_APP_STATE_FAILED;
    // tslint:disable-next-line:no-any
    error: any;
}

export type GetPersonActionType = GetPersonSuccess | GetPersonFailed;

export type ApiActionTypes =
    | GetPerson
    | GetPersonSuccess
    | GetPersonFailed
    | SendSoknad
    | SendSoknadSuccess
    | SendSoknadFailed
    | SaveAppState
    | SaveAppStateSuccess
    | SaveAppStateFailed
    | GetAppState
    | GetAppStateSuccess
    | GetAppStateFailed
    | SessionExpired;
