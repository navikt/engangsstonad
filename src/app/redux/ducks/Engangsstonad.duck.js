const APPROVE_CONDITIONS = 'APPROVE_CONDITIONS';
const CONFIRM_INFORMATION = 'CONFIRM_INFORMATION';
const ENABLE_NEXT_BUTTON = 'ENABLE_NEXT_BUTTON';
const DISABLE_NEXT_BUTTON = 'DISABLE_NEXT_BUTTON';
const TOGGLE_CHILD_BORN = 'TOGGLE_CHILD_BORN';
const TOGGLE_NO_OF_CHILDREN = 'TOGGLE_NO_OF_CHILDREN';
const SET_TERMIN_DATO = 'SET_TERMIN_DATO';
const SET_BEKREFTET_TERMIN_DATO = 'SET_BEKREFTET_TERMIN_DATO';

export const approveConditions = () => ({ type: APPROVE_CONDITIONS });
export const confirmInformation = () => ({ type: CONFIRM_INFORMATION });
export const enableNextButton = () => ({ type: ENABLE_NEXT_BUTTON });
export const disableNextButton = () => ({ type: DISABLE_NEXT_BUTTON });
export const toggleChildBorn = (e) => ({ type: TOGGLE_CHILD_BORN, data: e.target.value });
export const toggleNoOfChildren = (e) => ({ type: TOGGLE_NO_OF_CHILDREN, data: e.target.value });
export const setTerminDato = (e) => ({ type: SET_TERMIN_DATO, data: e.target.value });
export const setBekreftetTermindato = (e) => ({ type: SET_BEKREFTET_TERMIN_DATO, data: e.target.value });

const defaultState = {
    approvedConditions: undefined,
    confirmedInformation: undefined,
    nextButtonEnabled: false,
    childBorn: undefined,
    noOfChildren: undefined,
    terminDato: undefined,
    bekreftetTermindato: undefined
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
        default:
            return state;
    }
};

export default engangsstonadReducer;
