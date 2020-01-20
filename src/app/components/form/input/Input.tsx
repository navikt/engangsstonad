import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldProps, Field } from 'formik';
import { Input as NavInput, NavFrontendInputProps } from 'nav-frontend-skjema';

interface Props extends Omit<NavFrontendInputProps, 'label' | 'onChange' | 'value'> {
    name: string;
}

const Input: React.StatelessComponent<Props> = ({ name, ...rest }) => {
    return (
        <Field
            name={name}
            render={(fieldProps: FieldProps) => {
                const { field, form } = fieldProps;
                return (
                    <NavInput
                        label={<FormattedMessage id={field.name} />}
                        onChange={(e) => {
                            form.setFieldValue(field.name, e.target.value);
                            form.setFieldTouched(field.name, true);
                        }}
                        value={fieldProps.field.value}
                        {...rest}
                    />
                );
            }}
        />
    );
};
export default Input;
