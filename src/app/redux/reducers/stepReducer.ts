import { StepActionKeys, StepActionTypes } from './../actions/step/stepActionDefinitions';

export const getDefaultState = () => ({
    activeStep: 3
});

const stepReducer = (state = getDefaultState(), action: StepActionTypes) => {
    switch (action.type) {
        case StepActionKeys.SET_ACTIVE_STEP:
            return { ...state, activeStep: action.activeStep };
    }
    return state;
};

export default stepReducer;
