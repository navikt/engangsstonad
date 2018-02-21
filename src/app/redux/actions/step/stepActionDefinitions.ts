export enum StepActionKeys {
    'SET_ACTIVE_STEP' = 'setActiveStep'
}

interface SetActiveStep {
    type: StepActionKeys.SET_ACTIVE_STEP;
    activeStep: number;
}

export type StepActionTypes = SetActiveStep;
