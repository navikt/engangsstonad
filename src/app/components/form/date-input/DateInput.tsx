import * as React from 'react';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import { DatovelgerProps } from 'nav-datovelger';
import { guid } from 'nav-frontend-js-utils';
import SkjemaInputElement from 'components/skjema-input-element/SkjemaInputElement';
import { Field, FieldProps } from 'formik';

interface Props {
    name: string;
    datovelgerProps?: Partial<DatovelgerProps>;
}

const DatovelgerElement: React.StatelessComponent<Props> = ({ name, datovelgerProps }) => {
    return (
        <Field
            name={name}
            render={(fieldProps: FieldProps) => {
                const { field, form } = fieldProps;
                return (
                    <SkjemaInputElement label={field.name}>
                        <Datovelger
                            id={guid()}
                            input={{
                                id: field.name,
                                name: field.name,
                                onChange: (inputValue) => {
                                    if (inputValue !== '') {
                                        form.setFieldValue(field.name, inputValue);
                                    }
                                }
                            }}
                            onChange={(value) => {
                                if (value !== 'Invalid date') {
                                    form.setFieldValue(field.name, value);
                                }
                            }}
                            valgtDato={field.value}
                            {...datovelgerProps}
                        />
                    </SkjemaInputElement>
                );
            }}
        />
    );
};
export default DatovelgerElement;
