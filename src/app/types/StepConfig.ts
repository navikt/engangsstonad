import StegProps from 'app/engangsstonad/StegProps';
import { IntlShape } from 'react-intl';
import * as Yup from 'yup';

export interface StepConfig {
    fortsettKnappLabel: string;
    stegIndikatorLabel: string;
    component: (props: StegProps) => React.ReactNode;
    validationSchema?: (intl: IntlShape) => Yup.ObjectSchema<Yup.Shape<object, any>>;
}
