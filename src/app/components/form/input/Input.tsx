import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldProps, Field } from 'formik';
import { Input as NavInput, InputProps } from 'nav-frontend-skjema';
import { getErrorMessage, intlPrefix } from '../utils';

interface Props extends Omit<InputProps, 'label' | 'onChange' | 'value'> {
    name: string;
}

const Input: React.StatelessComponent<Props> = ({ name, ...rest }) => {
    return (
        <Field
            name={name}
            render={({ field, form }: FieldProps) => {
                return (
                    <NavInput
                        id={name}
                        name={name}
                        label={<FormattedMessage id={intlPrefix(name)} />}
                        onChange={(e) => {
                            form.setFieldValue(field.name, e.target.value);
                        }}
                        value={field.value || ''}
                        feil={getErrorMessage(form, name)}
                        {...rest}
                    />
                );
            }}
        />
    );
};
export default Input;
