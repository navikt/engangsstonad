import * as Yup from 'yup';

export interface StepConfig {
    fortsettKnappLabel: string;
    stegIndikatorLabel: string;
    component: any;
    validationSchema: Yup.ObjectSchema
};
