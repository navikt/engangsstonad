import { all, put, call, takeEvery } from 'redux-saga/effects';
import Api from './../../api';
import {
	GET_DATA_REQUESTED,
	GET_DATA_SUCCESS,
	GET_DATA_FAILED
} from '../constants';

function* getData(action) {
	try {
		const data = yield call(Api.fetchData, action.params);
		yield put({
			type: GET_DATA_SUCCESS,
			data: data.data
		});
	} catch (error) {
		yield put({
			type: GET_DATA_FAILED,
			error
		});
	}
}

export default function* sagas() {
	yield all([takeEvery(GET_DATA_REQUESTED, getData)]);
}
