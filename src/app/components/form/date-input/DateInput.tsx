import * as React from 'react';
import { FieldProps } from 'formik';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import { DatovelgerProps } from 'nav-datovelger';
import { guid } from 'nav-frontend-js-utils';
import moment from 'moment';
import SkjemaInputElement from 'components/skjema-input-element/SkjemaInputElement';

interface Props {
    fieldProps: FieldProps;
    datovelgerProps?: Partial<DatovelgerProps>;
}

const DatovelgerElement: React.StatelessComponent<Props> = ({ fieldProps, datovelgerProps }) => {
    const { field, form } = fieldProps;
    return (
        <SkjemaInputElement label={field.name}>
            <Datovelger
                id={guid()}
                input={{
                    id: field.name,
                    name: field.name,
                    onChange: (inputValue) => {
                        const val = moment(inputValue, moment.HTML5_FMT.DATE, true);
                        if (!val.isValid()) {
                            form.setFieldValue(field.name, val);
                        }
                    }
                }}
                onChange={(value) => {
                    form.setFieldValue(field.name, value);
                    form.setFieldTouched(field.name, true);
                }}
                valgtDato={field.value}
                {...datovelgerProps}
            />
        </SkjemaInputElement>
    );
};
export default DatovelgerElement;
