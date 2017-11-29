const defaultState = {};

const STEP_AHEAD = 'STEP_AHEAD';
const STEP_BACK = 'STEP_BACK';

export const stepAhead = () => ({ type: STEP_AHEAD });
export const stepBack = () => ({ type: STEP_BACK });

const stepReducer = (state = defaultState, action) => {
    switch (action.type) {
        case STEP_AHEAD:
            return state;
        case STEP_BACK:
            return state;
        default:
            return state;
    }
};

export default stepReducer;
