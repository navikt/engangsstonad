import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldProps, Field, useFormikContext } from 'formik';
import { Input as NavInput, InputProps } from 'nav-frontend-skjema';
import { getErrorMessage, intlPrefix } from '../utils';
import { withGradualVisibility, FormComponentProps } from '../visibility-hoc/withVisibility';
import { FormProps } from 'app/engangsstonad/FormProps';
import { visibilityHook } from '../hooks/hooks';

type Props = FormComponentProps & Omit<InputProps, 'label' | 'onChange' | 'value'>

const Input: React.StatelessComponent<Props> = ({ name, parent = 'NO_PARENT', ...rest }) => {
    const formik = useFormikContext<Partial<FormProps>>();
    React.useEffect(() => visibilityHook(formik.status, formik.setStatus, name, parent), []);
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
export default withGradualVisibility(Input);
