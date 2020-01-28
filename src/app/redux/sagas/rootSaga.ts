import { all } from 'redux-saga/effects';
import personSaga from './personSaga';
import søknadSaga from './søknadSaga';

export default function* rootSaga() {
    yield all([personSaga(), søknadSaga()]);
}
