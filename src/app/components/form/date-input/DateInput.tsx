import * as React from 'react';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import { DatovelgerProps } from 'nav-datovelger';
import { guid } from 'nav-frontend-js-utils';
import { Field, FieldProps } from 'formik';
import { FormattedMessage } from 'react-intl';
import SkjemaInputElement from 'components/skjema-input-element/SkjemaInputElement';

interface Props extends Partial<DatovelgerProps> {
    name: string;
}

const DatovelgerElement: React.StatelessComponent<Props> = ({ name, ...rest }) => {
    return (
        <Field
            name={name}
            render={(fieldProps: FieldProps) => {
                const { field, form } = fieldProps;
                return (
                    <SkjemaInputElement label={<FormattedMessage id={`spørsmål.${name}`} />}>
                        <Datovelger
                            id={guid()}
                            input={{
                                id: field.name,
                                name: field.name,
                                onChange: (inputValue) => {
                                    form.setFieldValue(field.name, inputValue);
                                }
                            }}
                            onChange={(value) => {
                                if (value !== 'Invalid date') {
                                    form.setFieldValue(field.name, value);
                                }
                            }}
                            valgtDato={field.value}
                            {...rest}
                        />
                    </SkjemaInputElement>
                );
            }}
        />
    );
};
export default DatovelgerElement;
