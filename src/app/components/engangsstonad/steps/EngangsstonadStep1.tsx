import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { injectIntl } from 'react-intl';
const { RadioPanelGruppe } = require('nav-frontend-skjema');
const Modal = require('nav-frontend-modal').default;
import { soknadActionCreators as soknad } from '../../../redux/actions';
import './../engangsstonad.less';
import {
    default as RelasjonTilBarn,
    RelasjonTilFodtBarn, RelasjonTilUfodtBarn
} from '../../../types/domain/RelasjonTilBarn';
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
    barnErFodt?: boolean;
    relasjonTilBarn: RelasjonTilBarn;
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
        const { barnErFodt } = this.props;
        if (barnErFodt === true) {
            return 'before';
        } else if (barnErFodt === false) {
            return 'ahead';
        } else {
            return undefined;
        }
    }

    getAntallBarnSelectedValue() {
        const { relasjonTilBarn } = this.props;
        if (relasjonTilBarn) {
            const { antallBarn } = relasjonTilBarn;
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
        const relasjonTilBarn = this.props.relasjonTilBarn as any;
        return [
            { test: () => (relasjonTilBarn.fodselsdato), failText: 'Du må oppgi en fødselsdato' },
            { test: () => (relasjonTilBarn.fodselsdato !== ''), failText: 'Du må oppgi en fødselsdato' },
            { test: () => (new Date(relasjonTilBarn.fodselsdato) <= new Date()), failText: 'Fødselsdatoen kan ikke være fram i tid' }
        ];
    }

    getTerminDatoValidators() {
        const relasjonTilBarn = this.props.relasjonTilBarn as any;
        return [
            { test: () => (relasjonTilBarn.terminDato), failText: 'Du må oppgi en termindato' },
            { test: () => (relasjonTilBarn.terminDato !== ''), failText: 'Du må oppgi en termindato' },
            { test: () => (erIUke26Pluss3(relasjonTilBarn.terminDato)), failText: 'Du må være i uke 26 eller senere' },
            { test: () => (erMindreEnn3UkerSiden(relasjonTilBarn.terminDato)), failText: 'Du kan ikke søke mer enn 3 uker etter termindato'}
        ];
    }

    getUtstedtDatoValidators() {
        const relasjonTilBarn = this.props.relasjonTilBarn as any;
        return [
            { test: () => (relasjonTilBarn.utstedtDato), failText: 'Du må oppgi en terminbekreftelsesdato' },
            { test: () => (relasjonTilBarn.utstedtDato !== ''), failText: 'Du må oppgi en terminbekreftelsesdato' },
            { test: () => (idagEllerTidligere(relasjonTilBarn.utstedtDato)), failText: 'Terminbekreftelsesdatoen må være idag eller tidligere' },
            {
                test: () => (new Date(relasjonTilBarn.utstedtDato) < new Date(relasjonTilBarn.terminDato)),
                failText: 'Terminbekreftelsesdatoen må være før termindato'
            },
            {
                test: () => (utstedtDatoErIUke26(relasjonTilBarn.utstedtDato, relasjonTilBarn.terminDato)),
                failText: 'Terminbekreftelsesdatoen må ha passert 26 uker i svangerskapet'
            }
        ];
    }

    render() {
        const { barnErFodt, relasjonTilBarn, dispatch, intl } = this.props;
        const antallBarn = relasjonTilBarn && relasjonTilBarn.antallBarn;
        const terminDato = relasjonTilBarn && (relasjonTilBarn as RelasjonTilUfodtBarn).terminDato;

        return (
            <div className="engangsstonad__step">
                <DocumentTitle title="NAV Engangsstønad - Relasjon til barn" />
                <RadioPanelGruppe
                    legend={getMessage(intl, 'relasjonBarn.text.fodselTidspunkt')}
                    name="fodselsTidspunkt"
                    onChange={(event: any, value: string) => dispatch(soknad.setBarnErFodt(value))}
                    checked={this.getFodselsTidspunktSelectedValue()}
                    radios={[
                        {label: getMessage(intl, 'relasjonBarn.radiobutton.fremtid'), value: 'ahead'},
                        {label: getMessage(intl, 'relasjonBarn.radiobutton.fortid'), value: 'before'}
                    ]}
                />

                {barnErFodt === true && (
                    <ValidDateInput
                        id="fodselsdato"
                        label={getMessage(intl, 'relasjonBarn.text.fodselsdato')}
                        selectedDate={relasjonTilBarn && (relasjonTilBarn as RelasjonTilFodtBarn).fodselsdato}
                        onChange={(e: string) => dispatch(soknad.setFodselsdato(e))}
                        name="fodselsdato"
                        validators={this.getFodselsdatoValidators()}
                    />
                )}

                {barnErFodt === false && (
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

                {barnErFodt === false && antallBarn &&  (
                    <ValidDateInput
                        id="termindato"
                        name="termindato"
                        label={getMessage(intl, 'relasjonBarn.text.termindato')}
                        selectedDate={relasjonTilBarn && (relasjonTilBarn as RelasjonTilUfodtBarn).terminDato}
                        onChange={(e: string) => dispatch(soknad.setTerminDato(e))}
                        validators={this.getTerminDatoValidators()}
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
                        selectedDate={relasjonTilBarn && (relasjonTilBarn as RelasjonTilUfodtBarn).utstedtDato}
                        label={getMessage(intl, 'relasjonBarn.text.datoTerminbekreftelse')}
                        onChange={(e: string) => dispatch(soknad.setUtstedtDato(e))}
                        validators={this.getUtstedtDatoValidators()}
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
    relasjonTilBarn: state.soknadReducer.relasjonTilBarn,
    barnErFodt: state.soknadReducer.barnErFodt,
    person: state.commonReducer.person
});

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(EngangsstonadStep1));