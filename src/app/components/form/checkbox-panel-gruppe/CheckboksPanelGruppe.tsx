import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { CheckboksPanelGruppe as NavCheckboksPanelGruppe, CheckboksPanelProps } from 'nav-frontend-skjema';
import { FieldProps, Field, useFormikContext } from 'formik';


import { getErrorMessage, intlPrefix } from '../utils';
import { FormComponentProps, withGradualVisibility } from '../visibility-hoc/withVisibility';
import { FormProps } from 'app/engangsstonad/FormProps';
import { visibilityHook } from '../hooks/hooks';

interface Props extends FormComponentProps {
    checkboxes: CheckboksPanelProps[];
}

const CheckboksPanelGruppe: React.StatelessComponent<Props> = ({ name, parent = "NO_PARENT", checkboxes }) => {
    const formik = useFormikContext<Partial<FormProps>>();
    React.useEffect(() => visibilityHook(formik.status, formik.setStatus, name, parent), []);
    return (
        <Field
            name={name}
            render={({ field, form }: FieldProps) => {
                const values: string[] = field.value || [];
                return (
                    <NavCheckboksPanelGruppe
                        legend={<FormattedMessage id={intlPrefix(name)} />}
                        checkboxes={checkboxes.map((c) => ({ ...c, checked: values.includes(c.value as any) }))}
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
