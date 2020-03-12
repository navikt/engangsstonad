import { EngangssoknadSoknadDto } from '../../../types/domain/EngangsstonadSoknad';
import Kvittering from 'app/types/services/Kvittering';
import { Søkerinfo } from 'app/types/domain/Søkerinfo';

export enum ApiActionKeys {
    'GET_SØKERINFO' = 'getSøkerinfo',
    'GET_SØKERINFO_SUCCESS' = 'getSøkerinfoSuccess',
    'GET_SØKERINFO_FAILED' = 'getSøkerinfoFailed',
    'SEND_SOKNAD' = 'sendSoknad',
    'SEND_SOKNAD_SUCCESS' = 'sendSoknadSuccess',
    'SEND_SOKNAD_FAILED' = 'sendSoknadFailed',
    'SESSION_EXPIRED' = 'sessionExpired'
}

interface SessionExpired {
    type: ApiActionKeys.SESSION_EXPIRED;
}

interface GetSøkerinfo {
    type: ApiActionKeys.GET_SØKERINFO;
}

interface GetPersonSuccess {
    type: ApiActionKeys.GET_SØKERINFO_SUCCESS;
    søkerinfo: Søkerinfo;
}

interface GetSøkerinfoFailed {
    type: ApiActionKeys.GET_SØKERINFO_FAILED;
    // tslint:disable-next-line:no-any
    error: any;
}

interface SendSoknad {
    type: ApiActionKeys.SEND_SOKNAD;
    soknad: EngangssoknadSoknadDto;
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

export type GetSøkerinfoActionType = GetPersonSuccess | GetSøkerinfoFailed;

export type ApiActionTypes =
    | GetSøkerinfo
    | GetPersonSuccess
    | GetSøkerinfoFailed
    | SendSoknad
    | SendSoknadSuccess
    | SendSoknadFailed
    | SessionExpired;
