import * as Yup from 'yup';
import { IntlShape } from 'react-intl';

export interface StepConfig {
    fortsettKnappLabel: string;
    stegIndikatorLabel: string;
    component: any;
    validationSchema: (intl: IntlShape) => Yup.ObjectSchema<Yup.Shape<object,any>>
};
