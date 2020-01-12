import { all, put, call, takeLatest } from 'redux-saga/effects';
import Api from '../../api/api';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';

function* getPerson() {
    try {
        const response = yield call(Api.getPerson);
        const person = response.data;
        yield put({ type: ApiActionKeys.GET_PERSON_SUCCESS, person });
    } catch (error) {
        yield put({ type: ApiActionKeys.GET_PERSON_FAILED, error });
    }
}

export default function* personSaga() {
    yield all([
        takeLatest(ApiActionKeys.GET_PERSON, getPerson),
    ]);
}
