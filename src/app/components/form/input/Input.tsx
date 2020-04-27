import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldProps, FastField } from 'formik';
import { Input as NavInput, InputProps } from 'nav-frontend-skjema';
import { getErrorMessage, intlPrefix } from '../utils';
import { withGradualVisibility, FormComponentProps } from '../visibility/withVisibility';
import { VisibilityContext } from '../visibility/VisibilityContext';
import { visibilityHook } from '../hooks/hooks';
import _ from 'lodash';

type Props = FormComponentProps & Omit<InputProps, 'label' | 'onChange' | 'value'>;

const Input: React.StatelessComponent<Props> = ({ name, parent = 'NO_PARENT', ...rest }) => {
    const visibilityContext = React.useContext(VisibilityContext);
    visibilityHook(visibilityContext.updateVisibility, name);
    return (
        <FastField name={name}>
            {({ form, field }: FieldProps) => {
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
        </FastField>
    );
};
export default withGradualVisibility(Input);
