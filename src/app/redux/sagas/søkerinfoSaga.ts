import { all, put, call, takeLatest } from 'redux-saga/effects';
import Api from '../../api/api';
import { ApiActionKeys } from '../actions/api/apiActionDefinitions';

function* getSøkerinfo() {
    try {
        const response = yield call(Api.getSøkerinfo);
        yield put({ type: ApiActionKeys.GET_SØKERINFO_SUCCESS, søkerinfo: response.data.søker });
    } catch (error) {
        yield put({ type: ApiActionKeys.GET_SØKERINFO_FAILED, error });
    }
}

export default function* søkerinfoSaga() {
    yield all([
        takeLatest(ApiActionKeys.GET_SØKERINFO, getSøkerinfo),
    ]);
}
