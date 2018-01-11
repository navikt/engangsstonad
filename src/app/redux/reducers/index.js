import {
	GET_DATA_FAILED,
	GET_DATA_SUCCESS,
	ACTIVE_ROUTE_CHANGED,
	TOGGLE_WORKED_IN_NORWAY_LAST_TWELVE_MONTHS,
	SET_NUMBER_OF_CHILDREN,
	APPROVE_CONDITIONS,
	CONFIRM_INFORMATION,
	SET_BEKREFTET_TERMIN_DATO,
	SET_TERMIN_DATO,
	TOGGLE_CHILD_BORN,
	TOGGLE_OPPHOLD_NAA,
	TOGGLE_RESIDED_IN_NORWAY_LAST_TWELVE_MONTHS
} from '../constants/index';

import { shouldShowStepper } from '../util';

const defaultState = {
	activeRoute: null,
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
	showStepper: true
};

const newState = (state) => ({
	...state,
	showStepper: shouldShowStepper(state.activeRoute, state)
});

const engangsstonadReducer = (state = defaultState, action) => {
	switch (action.type) {
		case ACTIVE_ROUTE_CHANGED: {
			const { route } = action;
			return newState({ ...state, activeRoute: route });
		}
		case APPROVE_CONDITIONS: {
			return newState({
				...state,
				approvedConditions: !state.approvedConditions
			});
		}
		case CONFIRM_INFORMATION: {
			return newState({
				...state,
				confirmedInformation: !state.confirmedInformation
			});
		}
		case TOGGLE_CHILD_BORN: {
			return newState({ ...state, childBorn: action.data });
		}
		case SET_NUMBER_OF_CHILDREN: {
			return newState({ ...state, noOfChildren: action.data });
		}
		case SET_TERMIN_DATO: {
			return newState({ ...state, terminDato: action.data });
		}
		case SET_BEKREFTET_TERMIN_DATO: {
			return newState({ ...state, bekreftetTermindato: action.data });
		}
		case TOGGLE_RESIDED_IN_NORWAY_LAST_TWELVE_MONTHS: {
			return newState({
				...state,
				residedInNorwayLastTwelveMonths: action.data,
				workedInNorwayLastTwelveMonths:
					defaultState.workedInNorwayLastTwelveMonths
			});
		}
		case TOGGLE_WORKED_IN_NORWAY_LAST_TWELVE_MONTHS: {
			return newState({
				...state,
				workedInNorwayLastTwelveMonths: action.data
			});
		}
		case TOGGLE_OPPHOLD_NAA: {
			return newState({ ...state, oppholdNaa: action.data });
		}
		case GET_DATA_SUCCESS: {
			return newState({ ...state, data: action.data });
		}
		case GET_DATA_FAILED: {
			return newState({ ...state, error: action.error });
		}
		default:
			return state;
	}
};

export default engangsstonadReducer;
