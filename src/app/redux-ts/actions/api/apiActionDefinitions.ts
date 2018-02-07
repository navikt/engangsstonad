import Person from '../../../types/Person';
import { EngangsstonadSoknadResponseType } from '../../../types/EngangsstonadSoknad';

export enum ApiActionKeys {
    'GET_PERSON_REQUESTED' = 'getPersonRequested',
    'GET_PERSON_SUCCESS' = 'getPersonSuccess',
    'GET_PERSON_FAILED' = 'getPersonFailed',
    'SEND_SOKNAD_REQUESTED' = 'sendSoknadRequested',
    'SEND_SOKNAD_SUCCESS' = 'sendSoknadSuccess',
    'SEND_SOKNAD_FAILED' = 'sendSoknadFailed'
}

interface GetPersonSuccess {
    type: ApiActionKeys.GET_PERSON_SUCCESS,
    person: Person
}

interface GetPersonFailed {
    type: ApiActionKeys.GET_PERSON_FAILED,
    reason: any
}

interface SendSoknadSuccess {
    type: ApiActionKeys.SEND_SOKNAD_SUCCESS,
    soknad: EngangsstonadSoknadResponseType
}

interface SendSoknadFailed {
    type: ApiActionKeys.SEND_SOKNAD_FAILED,
    reason: any
}

export type GetPersonActionType = GetPersonSuccess | GetPersonFailed;
export type SendSoknadActionType = SendSoknadSuccess | SendSoknadFailed;

export type ApiActionTypes =
    | GetPersonSuccess
    | GetPersonFailed
    | SendSoknadSuccess
    | SendSoknadFailed;
