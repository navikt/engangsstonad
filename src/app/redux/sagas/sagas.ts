import { all, put, call, takeEvery } from 'redux-saga/effects';
import Api from '../../api/api';
import { ApiActionKeys, GetPersonActionType } from '../actions/api/apiActionDefinitions';
import { EngangsstonadSoknadResponse } from '../../types/services/EngangsstonadSoknadResponse';

// tslint:disable-next-line:no-any
function* getPerson(action: any) {
    try {
        const response = yield call(Api.getPerson, action.params);
        const person: GetPersonActionType = response.data;
        yield put({ type: ApiActionKeys.GET_PERSON_SUCCESS, person });
    } catch (error) {
        yield put({ type: ApiActionKeys.GET_PERSON_FAILED, error });
    }
}

// tslint:disable-next-line:no-any
function* sendSoknad(action: any) {
    try {
        const response = yield call(Api.sendSoknad, action.soknad, action.vedlegg);
        const soknad: EngangsstonadSoknadResponse = response.data;
        yield put({ type: ApiActionKeys.SEND_SOKNAD_SUCCESS, soknad });
    } catch (error) {
        yield put({ type: ApiActionKeys.SEND_SOKNAD_FAILED, error });
    }
}

export default function* sagas() {
    yield all([
        takeEvery(ApiActionKeys.GET_PERSON, getPerson),
        takeEvery(ApiActionKeys.SEND_SOKNAD, sendSoknad)
    ]);
}
