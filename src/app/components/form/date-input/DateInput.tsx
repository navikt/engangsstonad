import * as React from 'react';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import { DatovelgerProps } from 'nav-datovelger';
import { guid } from 'nav-frontend-js-utils';
import { Field, FieldProps } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';
import SkjemaInputElement from 'components/skjema-input-element/SkjemaInputElement';
import getMessage from 'common/util/i18nUtils';
import { intlPrefix } from '../utils';

interface Props extends Partial<DatovelgerProps> {
    name: string;
}

const DatovelgerElement: React.StatelessComponent<Props> = ({ name, ...rest }) => {
    const intl = useIntl();
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
