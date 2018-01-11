import { all, put, call, takeEvery } from 'redux-saga/effects';
import Api from './../../api';

const APPROVE_CONDITIONS = 'APPROVE_CONDITIONS';
const CONFIRM_INFORMATION = 'CONFIRM_INFORMATION';
const TOGGLE_CHILD_BORN = 'TOGGLE_CHILD_BORN';
const SET_NUMBER_OF_CHILDREN = 'SET_NUMBER_OF_CHILDREN';
const SET_TERMIN_DATO = 'SET_TERMIN_DATO';
const SET_BEKREFTET_TERMIN_DATO = 'SET_BEKREFTET_TERMIN_DATO';
const TOGGLE_RESIDED_IN_NORWAY_LAST_TWELVE_MONTHS =
	'RESIDED_IN_NORWAY_LAST_TWELVE_MONTHS';
const TOGGLE_WORKED_IN_NORWAY_LAST_TWELVE_MONTHS =
	'WORKED_IN_NORWAY_LAST_TWELVE_MONTHS';
const TOGGLE_OPPHOLD_NAA = 'TOGGLE_OPPHOLD_NAA';
const GET_DATA_REQUESTED = 'GET_DATA_REQUESTED';
const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
const GET_DATA_FAILED = 'GET_DATA_FAILED';
const ADD_VISIT = 'ADD_COUNTRY';
const EDIT_VISIT = 'EDIT_VISIT';
const DELETE_VISIT = 'DELETE_COUNTRY';

export const approveConditions = () => ({ type: APPROVE_CONDITIONS });
export const confirmInformation = () => ({ type: CONFIRM_INFORMATION });
export const toggleChildBorn = (value) => ({
	type: TOGGLE_CHILD_BORN,
	data: value === 'before'
});
export const setNumberOfChildren = (value) => ({
	type: SET_NUMBER_OF_CHILDREN,
	data: value
});
export const setTerminDato = (date) => ({
	type: SET_TERMIN_DATO,
	data: date
});
export const setBekreftetTermindato = (date) => ({
	type: SET_BEKREFTET_TERMIN_DATO,
	data: date
});
export const toggleResidedInNorwayLastTwelveMonths = (value) => ({
	type: TOGGLE_RESIDED_IN_NORWAY_LAST_TWELVE_MONTHS,
	data: value
});
export const toggleWorkedInNorwayLastTwelveMonths = (value) => ({
	type: TOGGLE_WORKED_IN_NORWAY_LAST_TWELVE_MONTHS,
	data: value
});
export const toggleOppholdNaa = (e) => ({
	type: TOGGLE_OPPHOLD_NAA,
	data: e.target.value
});
export const getDataRequested = () => ({ type: GET_DATA_REQUESTED });

export const addVisit = (visitData) => ({
	type: ADD_VISIT,
	data: visitData
});

export const editVisit = (visitData, index) => ({
	type: EDIT_VISIT,
	data: visitData,
	visitIndex: index
});

export const deleteVisit = (visitData) => ({
	type: DELETE_VISIT,
	data: visitData
});

const defaultState = {
	approvedConditions: undefined,
	confirmedInformation: undefined,
	childBorn: undefined,
	noOfChildren: undefined,
	terminDato: undefined,
	bekreftetTermindato: undefined,
	residedInNorwayLastTwelveMonths: undefined,
	workedInNorwayLastTwelveMonths: undefined,
	oppholdNesteTolv: undefined,
	oppholdNaa: undefined,
	data: null,
	visits: []
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
		case TOGGLE_CHILD_BORN:
			return {
				...state,
				childBorn: action.data
			};
		case SET_NUMBER_OF_CHILDREN:
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
		case TOGGLE_RESIDED_IN_NORWAY_LAST_TWELVE_MONTHS:
			return {
				...state,
				residedInNorwayLastTwelveMonths: action.data,
				workedInNorwayLastTwelveMonths:
					defaultState.workedInNorwayLastTwelveMonths
			};
		case TOGGLE_WORKED_IN_NORWAY_LAST_TWELVE_MONTHS:
			return {
				...state,
				workedInNorwayLastTwelveMonths: action.data
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
		case ADD_VISIT:
			return {
				...state,
				visits: state.visits.concat(action.data)
			};
		case EDIT_VISIT:
			return {
				...state,
				visits: state.visits.map((visit, index) => {
					if (index === action.visitIndex) {
						return { ...visit, ...action.data };
					}
					return visit;
				})
			};
		case DELETE_VISIT:
			return {
				...state,
				visits: state.visits.filter((visit) => action.data !== visit)
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
