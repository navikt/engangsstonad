// tslint:disable-next-line:no-any
import apiUtils from 'util/apiUtils';
import { put, call, all, takeLatest } from 'redux-saga/effects';
import Api from '../../api/api';
import { ApiActionKeys } from 'actions/api/apiActionDefinitions';
import Kvittering from 'app/types/services/Kvittering';
import apiActionCreators from 'actions/api/apiActionCreators';

function* sendSøknad(action: any) {
    try {
        const response = yield call(Api.sendSoknad, apiUtils.cleanupSøknad(JSON.parse(JSON.stringify(action.soknad)), action.språkkode));
        const kvittering: Kvittering = response.data;
        yield put({ type: ApiActionKeys.SEND_SOKNAD_SUCCESS, kvittering });
    } catch (error) {
        error.response && (error.response.status === 401 || error.response.status === 403) ? yield put(apiActionCreators.sessionExpired()) :
        yield put({ type: ApiActionKeys.SEND_SOKNAD_FAILED, error });
    }
}

export default function* søknadSaga() {
    yield all([takeLatest(ApiActionKeys.SEND_SOKNAD, sendSøknad)]);
}
