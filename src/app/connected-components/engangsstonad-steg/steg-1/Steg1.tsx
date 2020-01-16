import React, { useState } from 'react';
import { Field, FieldProps, FormikProps } from 'formik';
import Select from 'components/form/select/Select';
import { JaNeiSpørsmål } from 'components/form/ja-nei-spørsmål/JaNeiSpørsmål';
import RadioPanelGruppeResponsiveWrapper from 'components/form/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import DatovelgerElement from 'components/form/date-input/DateInput';
import OmTerminbekreftelsen from 'components/modal-content/OmTerminbekreftelsen';
import { Skjemanummer } from 'common/storage/attachment/types/Attachment';
import AttachmentUploader from 'components/form/attachment-uploader/AttachmentUploader';

import { Question } from './questions';
import { FormProps } from '../FormProps';

interface Props {
    formikProps: FormikProps<Partial<FormProps>>;
}

const Steg1: React.FunctionComponent<Props> = ({ formikProps }) => {
    const { values, touched } = formikProps;
    const [isOmTerminbekreftelsenOpen, setOmTerminbekreftelsenOpen] = useState(false);
    return (
        <>
            <RadioPanelGruppeResponsiveWrapper
                name={Question.erFødt}
                radioValues={[JaNeiSpørsmål.JA, JaNeiSpørsmål.NEI]}
            />

            {touched[Question.erFødt] && (
                <RadioPanelGruppeResponsiveWrapper name={Question.antallBarn} radioValues={[1, 2, 3].map(String)} />
            )}

            {values[Question.antallBarn]! >= 3 && <Select name={Question.antallBarn} options={[3, 4, 5, 6, 7, 8, 9]} />}

            {touched[Question.antallBarn] && values[Question.erFødt] && (
                <DatovelgerElement name={Question.fødselsdato} />
            )}

            {touched[Question.antallBarn] && values[Question.erFødt] === false && (
                <>
                    <DatovelgerElement name={Question.termindato} />
                    
                    {values[Question.termindato] && (
                        <>
                            <OmTerminbekreftelsen
                                isOpen={isOmTerminbekreftelsenOpen}
                                onRequestClose={() => setOmTerminbekreftelsenOpen(false)}
                            />
                            <Field
                                name={Question.terminberkreftelse}
                                render={(fieldProps: FieldProps) => (
                                    <AttachmentUploader
                                        skjemanummer={Skjemanummer.TERMINBEKREFTELSE}
                                        fieldProps={fieldProps}
                                    />
                                )}
                            />
                        </>
                    )}

                    {values[Question.termindato] && <DatovelgerElement name={Question.terminberkreftelseDato} />}
                </>
            )}
        </>
    );
};
export default Steg1;
