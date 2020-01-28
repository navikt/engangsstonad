import * as React from 'react';
import { Field, FieldProps, FormikProps } from 'formik';
import { FormattedMessage } from 'react-intl';
import Veilederpanel from 'nav-frontend-veilederpanel';

import Select from 'components/form/select/Select';
import { JaNeiSpørsmål } from 'components/form/ja-nei-spørsmål/JaNeiSpørsmål';
import RadioPanelGruppeResponsiveWrapper from 'components/form/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import DatovelgerElement from 'components/form/date-input/DateInput';
import { Skjemanummer } from 'common/storage/attachment/types/Attachment';
import AttachmentUploader from 'components/form/attachment-uploader/AttachmentUploader';

import { Questions } from './questions';
import { FormProps } from '../FormProps';
import Veileder from 'components/veileder/Veileder';

interface Props {
    formikProps: FormikProps<Partial<FormProps>>;
}

const Steg1: React.StatelessComponent<Props> = ({ formikProps }) => {
    const { values, touched } = formikProps;
    return (
        <>
            <RadioPanelGruppeResponsiveWrapper
                name={Questions.erFødt}
                radioValues={[JaNeiSpørsmål.JA, JaNeiSpørsmål.NEI]}
            />

            {touched[Questions.erFødt] && (
                <RadioPanelGruppeResponsiveWrapper name={Questions.antallBarn} radioValues={[1, 2, 3].map(String)} />
            )}

            {values[Questions.antallBarn]! >= 3 && (
                <Select
                    name={Questions.antallBarn}
                    options={[3, 4, 5, 6, 7, 8, 9].map((value) => ({
                        label: String(value),
                        value
                    }))}
                />
            )}

            {touched[Questions.antallBarn] && values[Questions.erFødt] && (
                <DatovelgerElement name={Questions.fødselsdato} />
            )}

            {touched[Questions.antallBarn] && values[Questions.erFødt] === false && (
                <>
                    <DatovelgerElement name={Questions.termindato} />

                    {values[Questions.termindato] && (
                        <>
                            <Veilederpanel kompakt={true} svg={<Veileder />}>
                                <FormattedMessage id="terminbekreftelsen.text.terminbekreftelsen" />
                            </Veilederpanel>
                            
                            <Field
                                name={Questions.terminberkreftelse}
                                render={(fieldProps: FieldProps) => (
                                    <AttachmentUploader
                                        skjemanummer={Skjemanummer.TERMINBEKREFTELSE}
                                        fieldProps={fieldProps}
                                    />
                                )}
                            />
                        </>
                    )}

                    {values[Questions.termindato] && values[Questions.terminberkreftelse]!.length > 0 && (
                        <DatovelgerElement name={Questions.terminberkreftelseDato} />
                    )}
                </>

            )}
        </>
    );
};
export default Steg1;
