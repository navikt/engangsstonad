import { all, put, call, takeLatest } from 'redux-saga/effects';
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

export default function* personSaga() {
    yield all([takeLatest(ApiActionKeys.GET_PERSON, getPerson)]);
}
