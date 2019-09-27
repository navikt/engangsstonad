export interface StepConfig {
    fortsettKnappLabel: string;
    stegIndikatorLabel: string;
    component: any;
    nextStepCondition: () => boolean;
};
