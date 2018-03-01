import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { injectIntl } from 'react-intl';
const { RadioPanelGruppe } = require('nav-frontend-skjema');
const Modal = require('nav-frontend-modal').default;
import { soknadActionCreators as soknad } from '../../../redux/actions';
import './../engangsstonad.less';
import { default as Barn, FodtBarn, UfodtBarn } from '../../../types/domain/Barn';
import { Normaltekst } from 'nav-frontend-typografi';
const { ValidDateInput } = require('./../../../lib') as any;
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import Person from '../../../types/domain/Person';
import { DispatchProps } from '../../../redux/types';
import getMessage from 'util/i18n/i18nUtils';
import DialogBox from 'shared/dialog-box/DialogBox';
import LinkWithIcon from 'shared/link-with-icon/LinkWithIcon';
import OmTerminbekreftelsen from 'shared/modal-content/OmTerminbekreftelsen';
import {
    erIUke26Pluss3, erMindreEnn3UkerSiden, idagEllerTidligere,
    utstedtDatoErIUke26
} from 'util/validation/validationUtils';

interface StateProps {
    barn: Barn;
    person: Person;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

interface State {
    isModalOpen: boolean;
}

export class EngangsstonadStep1 extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentWillMount() {
        this.setState({ ...this.state, isModalOpen: false });
        Modal.setAppElement('#app');
    }

    openTerminbekreftelseModal() {
        this.setState({ isModalOpen: true });
    }

    closeTerminbekreftelseModal() {
        this.setState({ isModalOpen: false });
    }

    getFodselsTidspunktSelectedValue() {
        const { barn } = this.props;
        if (barn) {
            const { erBarnetFodt } = barn;
            if (erBarnetFodt === true) {
                return 'before';
            } else if (erBarnetFodt === false) {
                return 'ahead';
            }
        }
        return undefined;

    }

    getAntallBarnSelectedValue() {
        const { barn } = this.props;
        if (barn) {
            const { antallBarn } = barn;
            if (antallBarn === 1) {
                return 'ett';
            } else if (antallBarn === 2) {
                return 'tvillinger';
            } else if (antallBarn === 3) {
                return 'flere';
            }
        }
        return undefined;
    }

    getFodselsdatoValidators() {
        const barn = this.props.barn as any;
        return [
            { test: () => (barn.fodselsdatoer[0]), failText: 'Du må oppgi en fødselsdato' },
            { test: () => (barn.fodselsdatoer[0] !== ''), failText: 'Du må oppgi en fødselsdato' },
            { test: () => (new Date(barn.fodselsdatoer[0]) <= new Date()), failText: 'Fødselsdatoen kan ikke være fram i tid' }
        ];
    }

    getTermindatoValidators() {
        const barn = this.props.barn as any;
        return [
            { test: () => (barn.termindato), failText: 'Du må oppgi en termindato' },
            { test: () => (barn.termindato !== ''), failText: 'Du må oppgi en termindato' },
            { test: () => (erIUke26Pluss3(barn.termindato)), failText: 'Du må være i uke 26 eller senere' },
            { test: () => (erMindreEnn3UkerSiden(barn.termindato)), failText: 'Du kan ikke søke mer enn 3 uker etter termindato'}
        ];
    }

    getTerminbekreftelseDatoValidators() {
        const barn = this.props.barn as any;
        return [
            { test: () => (barn.terminbekreftelseDato), failText: 'Du må oppgi en terminbekreftelsesdato' },
            { test: () => (barn.terminbekreftelseDato !== ''), failText: 'Du må oppgi en terminbekreftelsesdato' },
            { test: () => (idagEllerTidligere(barn.terminbekreftelseDato)), failText: 'Terminbekreftelsesdatoen må være idag eller tidligere' },
            {
                test: () => (new Date(barn.terminbekreftelseDato) < new Date(barn.termindato)),
                failText: 'Terminbekreftelsesdatoen må være før termindato'
            },
            {
                test: () => (utstedtDatoErIUke26(barn.terminbekreftelseDato, barn.termindato)),
                failText: 'Terminbekreftelsesdatoen må ha passert 26 uker i svangerskapet'
            }
        ];
    }

    render() {
        const { barn, dispatch, intl } = this.props;
        const antallBarn = barn && barn.antallBarn;
        const terminDato = barn && (barn as UfodtBarn).termindato;

        return (
            <div className="engangsstonad__step">
                <DocumentTitle title="NAV Engangsstønad - Relasjon til barn" />
                <RadioPanelGruppe
                    legend={getMessage(intl, 'relasjonBarn.text.fodselTidspunkt')}
                    name="fodselsTidspunkt"
                    onChange={(event: any, value: string) => dispatch(soknad.setErBarnetFodt(value))}
                    checked={this.getFodselsTidspunktSelectedValue()}
                    radios={[
                        {label: getMessage(intl, 'relasjonBarn.radiobutton.fremtid'), value: 'ahead'},
                        {label: getMessage(intl, 'relasjonBarn.radiobutton.fortid'), value: 'before'}
                    ]}
                />

                {barn.erBarnetFodt === true && (
                    <ValidDateInput
                        id="fodselsdato"
                        label={getMessage(intl, 'relasjonBarn.text.fodselsdato')}
                        selectedDate={barn && (barn as FodtBarn).fodselsdatoer.length > 0 ? (barn as any).fodselsdatoer[0] : ''}
                        onChange={(e: string) => dispatch(soknad.addFodselsdato(e))}
                        name="fodselsdato"
                        validators={this.getFodselsdatoValidators()}
                    />
                )}

                {barn.erBarnetFodt === false && (
                    <RadioPanelGruppe
                        legend={getMessage(intl, 'relasjonBarn.text.antallBarn')}
                        name="antallBarn"
                        onChange={(event: any, value: string) => dispatch(soknad.setAntallBarn(value))}
                        checked={this.getAntallBarnSelectedValue()}
                        radios={[
                            {label: getMessage(intl, 'relasjonBarn.radiobutton.ettbarn'), value: 'ett'},
                            {label: getMessage(intl, 'relasjonBarn.radiobutton.tvillinger'), value: 'tvillinger'},
                            {label: getMessage(intl, 'relasjonBarn.radiobutton.flere'), value: 'flere'}
                        ]}
                    />
                )}

                {barn.erBarnetFodt === false && antallBarn &&  (
                    <ValidDateInput
                        id="termindato"
                        name="termindato"
                        label={getMessage(intl, 'relasjonBarn.text.termindato')}
                        selectedDate={barn && (barn as UfodtBarn).termindato}
                        onChange={(e: string) => dispatch(soknad.setTermindato(e))}
                        validators={this.getTermindatoValidators()}
                    />
                )}

                {terminDato && ([
                    <DialogBox type="warning" overflow={true} key="dialog">
                        <Normaltekst>{getMessage(intl, 'relasjonBarn.text.terminbekreftelse')}</Normaltekst>
                        <LinkWithIcon
                            iconKind="info-sirkel-fylt"
                            iconSize={24}
                            href="#"
                            linkText={getMessage(intl, 'relasjonBarn.link.lesTerminbekreftelse')}
                            onClick={() => this.openTerminbekreftelseModal()}
                        />
                    </DialogBox>,
                    <ValidDateInput
                        id="terminbekreftelse"
                        name="terminbekreftelse"
                        key="dateInputTerminBekreftelse"
                        selectedDate={barn && (barn as UfodtBarn).terminbekreftelseDato}
                        label={getMessage(intl, 'relasjonBarn.text.datoTerminbekreftelse')}
                        onChange={(e: string) => dispatch(soknad.setTerminbekreftelseDato(e))}
                        validators={this.getTerminbekreftelseDatoValidators()}
                    />
                ])}

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

const mapStateToProps = (state: any) => ({
    barn: state.soknadReducer.barn,
    person: state.commonReducer.person
});

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(EngangsstonadStep1));