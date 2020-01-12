import { StepActionKeys, StepActionTypes } from './../actions/step/stepActionDefinitions';

export interface StepState {
    activeStep: number;
}

export const getDefaultState = (): StepState => ({
    activeStep: 1
});

const stepReducer = (state = getDefaultState(), action: StepActionTypes): StepState => {
    switch (action.type) {
        case StepActionKeys.SET_ACTIVE_STEP:
            return { ...state, activeStep: action.activeStep };
        default:
            return state;
    }
};
export default stepReducer;
