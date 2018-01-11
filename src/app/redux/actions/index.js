import {
	TOGGLE_WORKED_IN_NORWAY_LAST_TWELVE_MONTHS,
	SET_NUMBER_OF_CHILDREN,
	APPROVE_CONDITIONS,
	ACTIVE_ROUTE_CHANGED,
	CONFIRM_INFORMATION,
	SET_BEKREFTET_TERMIN_DATO,
	SET_TERMIN_DATO,
	GET_DATA_REQUESTED,
	TOGGLE_CHILD_BORN,
	TOGGLE_OPPHOLD_NAA,
	TOGGLE_RESIDED_IN_NORWAY_LAST_TWELVE_MONTHS,
	TOGGLE_RESIDING_IN_NORWAY_DURING_BIRTH,
	TOGGLE_RESIDING_IN_NORWAY_NEXT_TWELVE_MONTHS
} from '../constants/index';

export const activeRouteChanged = (route) => ({
	type: ACTIVE_ROUTE_CHANGED,
	route
});

export const approveConditions = () => ({ type: APPROVE_CONDITIONS });
export const confirmInformation = () => ({ type: CONFIRM_INFORMATION });
export const getDataRequested = () => ({ type: GET_DATA_REQUESTED });

export const toggleChildBorn = (value) => ({
	type: TOGGLE_CHILD_BORN,
	data: value === undefined ? undefined : value === 'before'
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

export const toggleResidingInNorwayDuringBirth = (value) => ({
	type: TOGGLE_RESIDING_IN_NORWAY_DURING_BIRTH,
	data: value === undefined ? undefined : value === 'norway'
});

export const toggleResidingInNorwayNextTwelveMonths = (value) => ({
	type: TOGGLE_RESIDING_IN_NORWAY_NEXT_TWELVE_MONTHS,
	data: value === undefined ? undefined : value === 'norway'
});
