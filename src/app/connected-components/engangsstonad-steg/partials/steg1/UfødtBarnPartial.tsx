import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { soknadActionCreators as soknad } from '../../../../redux/actions';
import { UfodtBarn } from '../../../../types/domain/Barn';
import getMessage from 'common/util/i18nUtils';
import { DispatchProps } from 'common/redux/types';
import OmTerminbekreftelsen from 'components/modal-content/OmTerminbekreftelsen';
import {
    erMindreEnn3UkerSiden,
    idagEllerTidligere,
    getFørsteMuligeTermindato,
    getSisteMuligeTermindato,
    getForsteMuligeTerminbekreftesesdato,
    getSisteMuligeTerminbekreftesesdato,
    erIUke22Pluss3,
    utstedtDatoErIUke22,
} from 'util/validation/validationUtils';
const Modal = require('nav-frontend-modal').default;
import LabelText from 'common/components/labeltekst/Labeltekst';
import ValidDateInput from '../../../../lib/valid-date-input';
import FormBlock from 'components/form-block/FormBlock';
import { buildDateObject } from 'util/date/dateUtils';
import AttachmentsUploaderPure from 'common/storage/attachment/components/AttachmentUploaderPure';
import { Attachment, AttachmentType, Skjemanummer } from 'common/storage/attachment/types/Attachment';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder from 'components/veileder/Veileder';

interface StateProps {
    barn: UfodtBarn;
}

type Props = StateProps & DispatchProps;

const UfødtBarnPartial: React.FunctionComponent<Props> = ({ barn, dispatch }) => {
    const intl = useIntl();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { antallBarn, termindato, terminbekreftelse, terminbekreftelseDato } = barn;

    const closeTerminbekreftelseModal = () => {
        setIsModalOpen(false);
    };

    const getTermindatoValidators = () => {
        return [
            {
                test: () => termindato,
                failText: getMessage(intl, 'valideringsfeil.termindato.duMåOppgi'),
            },
            {
                test: () => termindato !== '',
                failText: getMessage(intl, 'valideringsfeil.termindato.duMåOppgi'),
            },
            {
                test: () => erIUke22Pluss3(termindato!),
                failText: getMessage(intl, 'valideringsfeil.termindato.duMåVæreIUke22'),
            },
            {
                test: () => erMindreEnn3UkerSiden(termindato!),
                failText: getMessage(intl, 'valideringsfeil.termindato.termindatoKanIkkeVære3UkerFraIdag'),
            },
        ];
    };

    const getTerminbekreftelseDatoValidators = () => {
        return [
            {
                test: () => terminbekreftelseDato,
                failText: getMessage(intl, 'valideringsfeil.terminbekreftelseDato.duMåOppgi'),
            },
            {
                test: () => terminbekreftelseDato !== '',
                failText: getMessage(intl, 'valideringsfeil.terminbekreftelseDato.duMåOppgi'),
            },
            {
                test: () => idagEllerTidligere(terminbekreftelseDato!),
                failText: getMessage(intl, 'valideringsfeil.terminbekreftelseDato.måVæreIdagEllerTidligere'),
            },
            {
                test: () => utstedtDatoErIUke22(terminbekreftelseDato!, termindato!),
                failText: getMessage(intl, 'valideringsfeil.terminbekreftelseDato.duMåVæreIUke22'),
            },
        ];
    };

    const datoavgrensningTermindato = {
        minDato: getFørsteMuligeTermindato(),
        maksDato: getSisteMuligeTermindato(),
    };

    const datoavgrensningTerminbekreftelse = {
        minDato: getForsteMuligeTerminbekreftesesdato(termindato),
        maksDato: getSisteMuligeTerminbekreftesesdato(termindato),
    };

    return (
        <div>
            {antallBarn && (
                <FormBlock>
                    <ValidDateInput
                        id="termindato"
                        name="termindato"
                        dato={buildDateObject(termindato)}
                        label={<LabelText intlId="relasjonBarn.text.termindato" />}
                        onChange={(dato: Date) =>
                            dato && dispatch(soknad.setTermindato(dato ? dato.toISOString() : ''))
                        }
                        onInputChange={(dato: string) => dato && dispatch(soknad.setTermindato(dato))}
                        validators={getTermindatoValidators()}
                        avgrensninger={datoavgrensningTermindato}
                    />
                </FormBlock>
            )}

            <FormBlock visible={termindato !== undefined}>
                <div className="blokk-xs" key="veileder">
                    <Veilederpanel kompakt={true} svg={<Veileder />}>
                        {getMessage(intl, 'terminbekreftelsen.text.terminbekreftelsen')}
                    </Veilederpanel>
                </div>
                <AttachmentsUploaderPure
                    attachments={terminbekreftelse || []}
                    attachmentType={AttachmentType.TERMINBEKREFTELSE}
                    skjemanummer={Skjemanummer.TERMINBEKREFTELSE}
                    onFilesSelect={(attachments: Attachment[]) => {
                        attachments.forEach((attachment: Attachment) => {
                            dispatch(soknad.uploadAttachment(attachment));
                        });
                    }}
                    onFileDelete={(attachment: Attachment) => {
                        dispatch(soknad.deleteAttachment(attachment));
                    }}
                />
            </FormBlock>

            <FormBlock
                visible={
                    terminbekreftelse !== undefined &&
                    terminbekreftelse.filter((a: Attachment) => !isAttachmentWithError(a)).length > 0 &&
                    termindato !== undefined
                }
            >
                <div key="dateInputTerminBekreftelse">
                    <ValidDateInput
                        id="terminbekreftelse"
                        name="terminbekreftelse"
                        dato={buildDateObject(terminbekreftelseDato)}
                        label={<LabelText intlId="relasjonBarn.text.datoTerminbekreftelse" />}
                        onChange={(dato: Date) =>
                            dato && dispatch(soknad.setTerminbekreftelseDato(dato ? dato.toISOString() : ''))
                        }
                        onInputChange={(dato: string) => dato && dispatch(soknad.setTerminbekreftelseDato(dato))}
                        validators={getTerminbekreftelseDatoValidators()}
                        avgrensninger={datoavgrensningTerminbekreftelse}
                    />
                </div>
            </FormBlock>
            <Modal
                isOpen={isModalOpen}
                closeButton={true}
                onRequestClose={() => closeTerminbekreftelseModal()}
                contentLabel="Om terminbekreftelsen"
            >
                <OmTerminbekreftelsen />
            </Modal>
        </div>
    );
};
export default UfødtBarnPartial;
