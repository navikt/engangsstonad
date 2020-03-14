import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import { guid } from 'nav-frontend-js-utils';
import { Field, FieldProps, useFormikContext } from 'formik';

import SkjemaInputElement from 'components/skjema-input-element/SkjemaInputElement';
import getMessage from 'common/util/i18nUtils';

import { intlPrefix } from '../utils';
import { withGradualVisibility } from '../visibility-hoc/withVisibility';
import { DatovelgerProps } from 'nav-datovelger';
import { FormProps } from 'app/engangsstonad/FormProps';
import { visibilityHook } from '../hooks/hooks';

interface Props extends Partial<DatovelgerProps> {
    name: string;
    parent?: string;
}

const DatovelgerElement: React.StatelessComponent<Props> = ({ name, parent = 'NO_PARENT', ...rest }) => {
    const intl = useIntl();
    const formik = useFormikContext<Partial<FormProps>>();
    React.useEffect(() => visibilityHook(formik.status, formik.setStatus, name, parent), []);
    return (
        <Field
            name={name}
            render={({ field, form }: FieldProps) => {
                const feilmelding = form.status?.hasSubmitted ? form.errors[name]?.toString() : undefined;
                return (
                    <SkjemaInputElement
                        label={<FormattedMessage id={intlPrefix(name)} />}
                        feil={feilmelding ? { feilmelding: getMessage(intl, feilmelding) } : undefined}
                    >
                        <Datovelger
                            id={guid()}
                            input={{
                                id: field.name,
                                name: field.name,
                                onChange: (inputValue) => {
                                    form.setFieldValue(field.name, inputValue);
                                },
                                placeholder: 'dd.mm.yyyy'
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
export default withGradualVisibility<Props>(DatovelgerElement);
