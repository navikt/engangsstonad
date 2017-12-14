const APPROVE_CONDITIONS = 'APPROVE_CONDITIONS';
const CONFIRM_INFORMATION = 'CONFIRM_INFORMATION';

export const approveConditions = () => ({ type: APPROVE_CONDITIONS });
export const confirmInformation = () => ({ type: CONFIRM_INFORMATION });

const defaultState = {
    approvedConditions: false,
    confirmedInformation: false
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
        default:
            return state;
    }
};

export default engangsstonadReducer;
