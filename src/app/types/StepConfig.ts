import * as Yup from 'yup';
import { IntlShape } from 'react-intl';
import StegProps from 'app/engangsstonad/StegProps';

export interface StepConfig {
    fortsettKnappLabel: string;
    stegIndikatorLabel: string;
    component: (props: StegProps) => React.ReactNode;
    validationSchema: (intl: IntlShape) => Yup.ObjectSchema<Yup.Shape<object, any>>;
}
