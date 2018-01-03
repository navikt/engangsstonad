import { all, put, call, takeEvery } from "redux-saga/effects";
import Api from "./../../api";

const APPROVE_CONDITIONS = "APPROVE_CONDITIONS";
const CONFIRM_INFORMATION = "CONFIRM_INFORMATION";
const ENABLE_NEXT_BUTTON = "ENABLE_NEXT_BUTTON";
const DISABLE_NEXT_BUTTON = "DISABLE_NEXT_BUTTON";
const TOGGLE_CHILD_BORN = "TOGGLE_CHILD_BORN";
const TOGGLE_NO_OF_CHILDREN = "TOGGLE_NO_OF_CHILDREN";
const SET_TERMIN_DATO = "SET_TERMIN_DATO";
const SET_BEKREFTET_TERMIN_DATO = "SET_BEKREFTET_TERMIN_DATO";
const TOGGLE_SISTE_TOLV = "TOGGLE_SISTE_TOLV";
const TOGGLE_NESTE_TOLV = "TOGGLE_NESTE_TOLV";
const TOGGLE_OPPHOLD_NAA = "TOGGLE_OPPHOLD_NAA";
const GET_DATA_REQUESTED = "GET_DATA_REQUESTED";
const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
const GET_DATA_FAILED = "GET_DATA_FAILED";

export const approveConditions = () => ({ type: APPROVE_CONDITIONS });
export const confirmInformation = () => ({ type: CONFIRM_INFORMATION });
export const enableNextButton = () => ({ type: ENABLE_NEXT_BUTTON });
export const disableNextButton = () => ({ type: DISABLE_NEXT_BUTTON });
export const toggleChildBorn = (e) => ({
	type: TOGGLE_CHILD_BORN,
	data: e.target.value === "ja"
});
export const toggleNoOfChildren = (e) => ({
	type: TOGGLE_NO_OF_CHILDREN,
	data: e.target.value
});
export const setTerminDato = (e) => ({
	type: SET_TERMIN_DATO,
	data: e.target.value
});
export const setBekreftetTermindato = (e) => ({
	type: SET_BEKREFTET_TERMIN_DATO,
	data: e.target.value
});
export const toggleSisteTolv = (e) => ({
	type: TOGGLE_SISTE_TOLV,
	data: e.target.value
});
export const toggleNesteTolv = (e) => ({
	type: TOGGLE_NESTE_TOLV,
	data: e.target.value
});
export const toggleOppholdNaa = (e) => ({
	type: TOGGLE_OPPHOLD_NAA,
	data: e.target.value
});
export const getDataRequested = () => ({ type: GET_DATA_REQUESTED });

const defaultState = {
	approvedConditions: undefined,
	confirmedInformation: undefined,
	nextButtonEnabled: false,
	childBorn: undefined,
	noOfChildren: undefined,
	terminDato: undefined,
	bekreftetTermindato: undefined,
	oppholdSisteTolv: undefined,
	oppholdNesteTolv: undefined,
	oppholdNaa: undefined,
	data: null
};

const engangsstonadReducer = (state = defaultState, action) => {
	switch (action.type) {
		case APPROVE_CONDITIONS:
			return {
				...state,
				approvedConditions: !state.approvedConditions
			};
		case CONFIRM_INFORMATION:
			return {
				...state,
				confirmedInformation: !state.confirmedInformation
			};
		case ENABLE_NEXT_BUTTON:
			return {
				...state,
				nextButtonEnabled: true
			};
		case DISABLE_NEXT_BUTTON:
			return {
				...state,
				nextButtonEnabled: false
			};
		case TOGGLE_CHILD_BORN:
			return {
				...state,
				childBorn: action.data
			};
		case TOGGLE_NO_OF_CHILDREN:
			return {
				...state,
				noOfChildren: action.data
			};
		case SET_TERMIN_DATO:
			return {
				...state,
				terminDato: action.data
			};
		case SET_BEKREFTET_TERMIN_DATO:
			return {
				...state,
				bekreftetTermindato: action.data
			};
		case TOGGLE_SISTE_TOLV:
			return {
				...state,
				oppholdSisteTolv: action.data
			};
		case TOGGLE_NESTE_TOLV:
			return {
				...state,
				oppholdNesteTolv: action.data
			};
		case TOGGLE_OPPHOLD_NAA:
			return {
				...state,
				oppholdNaa: action.data
			};
		case GET_DATA_SUCCESS:
			return {
				...state,
				data: action.data
			};
		case GET_DATA_FAILED:
			return {
				...state,
				error: action.error
			};
		default:
			return state;
	}
};

function* getData() {
	try {
		const data = yield call(Api.fetchData);
		yield put({
			type: GET_DATA_SUCCESS,
			data
		});
	} catch (error) {
		yield put({
			type: GET_DATA_FAILED,
			error
		});
	}
}

export function* sagas() {
	yield all([takeEvery(GET_DATA_REQUESTED, getData)]);
}

export default engangsstonadReducer;
