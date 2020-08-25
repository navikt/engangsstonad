import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { soknadActionCreators as soknad } from '../../../../redux/actions';
import { default as Barn, UfodtBarn } from '../../../../types/domain/Barn';
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
    barn: Barn;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

interface State {
    isModalOpen: boolean;
}

export default class UfødtBarnPartial extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isModalOpen: false,
        };
    }

    closeTerminbekreftelseModal() {
        this.setState({ isModalOpen: false });
    }

    getTermindatoValidators() {
        const { intl } = this.props;
        const barn = this.props.barn as any;
        return [
            {
                test: () => barn.termindato,
                failText: getMessage(intl, 'valideringsfeil.termindato.duMåOppgi'),
            },
            {
                test: () => barn.termindato !== '',
                failText: getMessage(intl, 'valideringsfeil.termindato.duMåOppgi'),
            },
            {
                test: () => erIUke22Pluss3(barn.termindato),
                failText: getMessage(intl, 'valideringsfeil.termindato.duMåVæreIUke22'),
            },
            {
                test: () => erMindreEnn3UkerSiden(barn.termindato),
                failText: getMessage(intl, 'valideringsfeil.termindato.termindatoKanIkkeVære3UkerFraIdag'),
            },
        ];
    }

    getTerminbekreftelseDatoValidators() {
        const { intl } = this.props;
        const barn = this.props.barn as any;
        return [
            {
                test: () => barn.terminbekreftelseDato,
                failText: getMessage(intl, 'valideringsfeil.terminbekreftelseDato.duMåOppgi'),
            },
            {
                test: () => barn.terminbekreftelseDato !== '',
                failText: getMessage(intl, 'valideringsfeil.terminbekreftelseDato.duMåOppgi'),
            },
            {
                test: () => idagEllerTidligere(barn.terminbekreftelseDato),
                failText: getMessage(intl, 'valideringsfeil.terminbekreftelseDato.måVæreIdagEllerTidligere'),
            },
            {
                test: () => utstedtDatoErIUke22(barn.terminbekreftelseDato, barn.termindato),
                failText: getMessage(intl, 'valideringsfeil.terminbekreftelseDato.duMåVæreIUke22'),
            },
        ];
    }

    render() {
        const { dispatch, intl } = this.props;
        const barn = this.props.barn as UfodtBarn;
        const { antallBarn } = barn;
        const { termindato, terminbekreftelse, terminbekreftelseDato } = barn;

        const datoavgrensningTermindato = {
            minDato: getFørsteMuligeTermindato(),
            maksDato: getSisteMuligeTermindato(),
        };

        const datoavgrensningTerminbekreftelse = {
            minDato: getForsteMuligeTerminbekreftesesdato(barn.termindato),
            maksDato: getSisteMuligeTerminbekreftesesdato(barn.termindato),
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
                            validators={this.getTermindatoValidators()}
                            avgrensninger={datoavgrensningTermindato}
                        />
                    </FormBlock>
                )}

                <FormBlock visible={barn.termindato !== undefined}>
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
                        barn.terminbekreftelse !== undefined &&
                        barn.terminbekreftelse.filter((a: Attachment) => !isAttachmentWithError(a)).length > 0 &&
                        barn.termindato !== undefined
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
                            validators={this.getTerminbekreftelseDatoValidators()}
                            avgrensninger={datoavgrensningTerminbekreftelse}
                        />
                    </div>
                </FormBlock>
                <Modal
                    isOpen={this.state.isModalOpen}
                    closeButton={true}
                    onRequestClose={() => this.closeTerminbekreftelseModal()}
                    contentLabel="Om terminbekreftelsen"
                >
                    <OmTerminbekreftelsen />
                </Modal>
            </div>
        );
    }
}
