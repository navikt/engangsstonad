import { StepActionKeys, StepActionTypes } from './../actions/step/stepActionDefinitions';
import { GetAppStateSuccess, ApiActionKeys } from 'actions/api/apiActionDefinitions';

export interface StepState {
    activeStep: number;
}

export const getDefaultState = (): StepState  => ({
    activeStep: 1
});

const stepReducer = (state = getDefaultState(), action: StepActionTypes | GetAppStateSuccess): StepState => {
    switch (action.type) {
        case StepActionKeys.SET_ACTIVE_STEP:
            return { ...state, activeStep: action.activeStep };
        case ApiActionKeys.GET_APP_STATE_SUCCESS:
            return {...state, ...action.appState.step};
    }
    return state;
};

export default stepReducer;
