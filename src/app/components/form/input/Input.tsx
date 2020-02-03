import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldProps, Field } from 'formik';
import { Input as NavInput, InputProps} from 'nav-frontend-skjema';
import _ from 'lodash';

interface Props extends Omit<InputProps, 'label' | 'onChange' | 'value'> {
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
                        id={name}
                        name={name}
                        label={<FormattedMessage id={`spørsmål.${name}`} />}
                        onChange={(e) => {
                            form.setFieldValue(field.name, e.target.value);
                        }}
                        value={fieldProps.field.value || ''}
                        {...rest}
                    />
                );
            }}
        />
    );
};
export default Input;
