import React, { useState } from 'react';
import { Field, FieldProps, FormikProps } from 'formik';
const Modal = require('nav-frontend-modal').default;

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
            <Field
                name={Question.erFødt}
                render={(fieldProps: FieldProps) => (
                    <RadioPanelGruppeResponsiveWrapper
                        radioValues={[JaNeiSpørsmål.JA, JaNeiSpørsmål.NEI]}
                        fieldProps={fieldProps}
                    />
                )}
            />
            {touched[Question.erFødt] && (
                <Field
                    name={Question.antallBarn}
                    render={(fieldProps: FieldProps) => {
                        return (
                            <RadioPanelGruppeResponsiveWrapper radioValues={[1, 2, 3].map(String)} fieldProps={fieldProps} />
                        );
                    }}
                />
            )}
            {values[Question.antallBarn]! >= 3 && (
                <Field
                    name={Question.antallBarn}
                    render={(fieldProps: FieldProps) => (
                        <Select fieldProps={fieldProps} options={[3, 4, 5, 6, 7, 8, 9]} />
                    )}
                />
            )}
            {touched[Question.antallBarn] && values[Question.erFødt] && (
                <Field
                    name={Question.fødselsdato}
                    render={(fieldProps: FieldProps) => <DatovelgerElement fieldProps={fieldProps} />}
                />
            )}
            {touched[Question.antallBarn] && values[Question.erFødt] === false && (
                <>
                    <Field
                        name={Question.termindato}
                        render={(fieldProps: FieldProps) => <DatovelgerElement fieldProps={fieldProps} />}
                    />

                    {values[Question.termindato] && (
                        <Field
                            name={Question.terminberkreftelse}
                            render={(fieldProps: FieldProps) => (
                                <AttachmentUploader
                                    skjemanummer={Skjemanummer.TERMINBEKREFTELSE}
                                    fieldProps={fieldProps}
                                />
                            )}
                        />
                    )}

                    {values[Question.termindato] && (
                        <Field
                            name={Question.terminberkreftelseDato}
                            render={(fieldProps: FieldProps) => <DatovelgerElement fieldProps={fieldProps} />}
                        />
                    )}
                    <Modal
                        isOpen={isOmTerminbekreftelsenOpen}
                        closeButton={true}
                        onRequestClose={() => setOmTerminbekreftelsenOpen(false)}
                        contentLabel="Om terminbekreftelsen">
                        <OmTerminbekreftelsen />
                    </Modal>
                </>
            )}
        </>
    );
};
export default Steg1;
