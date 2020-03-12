import { all } from 'redux-saga/effects';
import søkerinfoSaga from './søkerinfoSaga';
import søknadSaga from './søknadSaga';

export default function* rootSaga() {
    yield all([søkerinfoSaga(), søknadSaga()]);
}
