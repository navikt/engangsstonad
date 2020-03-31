import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { CheckboksPanelGruppe as NavCheckboksPanelGruppe, CheckboksPanelProps } from 'nav-frontend-skjema';
import { FieldProps, Field } from 'formik';

import { getErrorMessage, intlPrefix } from '../utils';
import { FormComponentProps, withGradualVisibility } from '../visibility-hoc/withVisibility';
import { VisibilityContext } from '../visibility-context/VisibilityContext';
import { visibilityHook } from '../hooks/hooks';

interface Props extends FormComponentProps {
    checkboxes: CheckboksPanelProps[];
}

const CheckboksPanelGruppe: React.StatelessComponent<Props> = ({ name, checkboxes }) => {
    const visibilityContext = React.useContext(VisibilityContext);
    visibilityHook(visibilityContext.updateVisibility, name);
    return (
        <Field
            name={name}
            render={({ field, form }: FieldProps) => {
                const values: string[] = field.value || [];
                return (
                    <NavCheckboksPanelGruppe
                        legend={<FormattedMessage id={intlPrefix(name)} />}
                        checkboxes={checkboxes.map((c) => ({
                            ...c,
                            checked: !c.disabled && values.includes(c.value as any)
                        }))}
                        onChange={(_, value) => {
                            if (values.includes(value)) {
                                form.setFieldValue(
                                    field.name,
                                    values.filter((v) => v !== value)
                                );
                            } else {
                                form.setFieldValue(field.name, values.concat(value));
                            }
                        }}
                        feil={getErrorMessage(form, name)}
                    />
                );
            }}
        />
    );
};
export default withGradualVisibility(CheckboksPanelGruppe);
