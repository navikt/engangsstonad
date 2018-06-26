import { all, put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import Api from '../../api/api';
import { ApiActionKeys, GetPersonActionType } from '../actions/api/apiActionDefinitions';

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

function* saveAppState(action: SaveAppState) {
    try {
        yield call(Api.saveAppState, action.appState);
        yield put({ type: ApiActionKeys.SAVE_APP_STATE_SUCCESS });
    } catch (error) {
        yield put({ type: ApiActionKeys.SAVE_APP_STATE_FAILED, error });
    }
}

function* getAppState(action: any) {
    try {
        const response = yield call(Api.getAppState, action.params);
        const appState = response.data;
        yield put({ type: ApiActionKeys.GET_APP_STATE_SUCCESS, appState });
    } catch (error) {
        yield put({ type: ApiActionKeys.GET_APP_STATE_FAILED, error });
    }
}

export default function* personSaga() {
    yield all([
        takeLatest(ApiActionKeys.GET_PERSON, getPerson),
        takeEvery(ApiActionKeys.SAVE_APP_STATE, saveAppState),
        takeEvery(ApiActionKeys.GET_APP_STATE, getAppState)
    ]);
}
