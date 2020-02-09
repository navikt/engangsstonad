import * as Yup from 'yup';
import { IntlShape } from 'react-intl';
import StegProps from 'app/connected-components/engangsstonad-steg/StegProps';

export interface StepConfig {
    fortsettKnappLabel: string;
    stegIndikatorLabel: string;
    component: (props: StegProps) => React.ReactNode;
    validationSchema: (intl: IntlShape) => Yup.ObjectSchema<Yup.Shape<object, any>>;
}
