import { StepActionTypes, StepActionKeys } from './stepActionDefinitions';

export function setActiveStep(activeStep: number): StepActionTypes {
    return {
        type: StepActionKeys.SET_ACTIVE_STEP,
        activeStep
    };
}

export default { setActiveStep };
