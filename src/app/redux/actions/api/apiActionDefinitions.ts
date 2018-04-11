import Person from '../../../types/domain/Person';
import { default as EngangsstonadSoknad } from '../../../types/domain/EngangsstonadSoknad';
import { EngangsstonadSoknadResponse } from '../../../types/services/EngangsstonadSoknadResponse';
import PersonRequest from '../../../types/services/PersonRequest';

export enum ApiActionKeys {
    'GET_PERSON' = 'getPerson',
    'GET_PERSON_SUCCESS' = 'getPersonSuccess',
    'GET_PERSON_FAILED' = 'getPersonFailed',
    'SEND_SOKNAD' = 'sendSoknad',
    'SEND_SOKNAD_SUCCESS' = 'sendSoknadSuccess',
    'SEND_SOKNAD_FAILED' = 'sendSoknadFailed'
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
    kvittering: EngangsstonadSoknadResponse;
}

interface SendSoknadFailed {
    type: ApiActionKeys.SEND_SOKNAD_FAILED;
    // tslint:disable-next-line:no-any
    error: any;
}

export type GetPersonActionType = GetPersonSuccess | GetPersonFailed;
export type SendSoknadActionType = SendSoknadSuccess | SendSoknadFailed;

export type ApiActionTypes =
    | GetPerson
    | GetPersonSuccess
    | GetPersonFailed
    | SendSoknad
    | SendSoknadSuccess
    | SendSoknadFailed;
