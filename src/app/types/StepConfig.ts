import { NextStepCondition } from 'app/connected-components/engangsstonad-steg/steg.config';

export type StepConfig = {
    fortsettKnappLabel: string;
    stegIndikatorLabel: string;
    component: any;
    nextStepCondition: (params: NextStepCondition) => boolean;
};
