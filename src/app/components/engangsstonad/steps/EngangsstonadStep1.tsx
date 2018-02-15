import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { injectIntl } from 'react-intl';
const Modal = require('nav-frontend-modal').default;
import { soknadActionCreators as soknad } from '../../../redux/actions';
import './../engangsstonad.less';
import {
    default as RelasjonTilBarn,
    RelasjonTilFodtBarn, RelasjonTilUfodtBarn
} from '../../../types/domain/RelasjonTilBarn';
import { Normaltekst } from 'nav-frontend-typografi';
import DateInput from './../../shared/date-input/DateInput';
import { History } from 'history';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import Person from '../../../types/domain/Person';
import { DispatchProps } from '../../../redux/types';
import renderRadioList from 'util/render/renderUtils';
import getMessage from 'util/i18n/i18nUtils';
import DialogBox from 'shared/dialog-box/DialogBox';
import LinkWithIcon from 'shared/link-with-icon/LinkWithIcon';
import OmTerminbekreftelsen from 'shared/modal-content/OmTerminbekreftelsen';

interface StateProps {
    barnErFodt?: boolean;
    relasjonTilBarn: RelasjonTilBarn;
    person: Person;
}

interface ExternalProps {
    history: History;
}

type Props = StateProps & InjectedIntlProps & DispatchProps & ExternalProps;

interface State {
    isModalOpen: boolean;
}

export class EngangsstonadStep1 extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleNextClicked = this.handleNextClicked.bind(this);
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

    handleNextClicked(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.props.history.push('/engangsstonad/step2');
    }

    getFodselsTidspunktSelectedValue(barnErFodt?: boolean) {
        if (barnErFodt === true) {
            return 'before';
        } else if (barnErFodt === false) {
            return 'ahead';
        } else {
            return undefined;
        }
    }

    getAntallBarnSelectedValue(antallBarn?: number) {
        if (antallBarn === 1) {
            return 'ett';
        } else if (antallBarn === 2) {
            return 'tvillinger';
        } else if (antallBarn === 3) {
            return 'flere';
        } else {
            return undefined;
        }
    }

    render() {
        const { barnErFodt, relasjonTilBarn, dispatch, intl } = this.props;
        const antallBarn = relasjonTilBarn && relasjonTilBarn.antallBarn;
        const terminDato = relasjonTilBarn && (relasjonTilBarn as RelasjonTilUfodtBarn).terminDato;

        const fodselTidspunktRadioList = renderRadioList({
            intl,
            titleIntlId: 'relasjonBarn.text.fodselTidspunkt',
            action: (value: string) => dispatch(soknad.setBarnErFodt(value)),
            name: 'fodselTidspunkt',
            selectedValue: this.getFodselsTidspunktSelectedValue(barnErFodt),
            options: [
                { labelIntlId: 'relasjonBarn.radiobutton.fremtid', value: 'ahead' },
                { labelIntlId: 'relasjonBarn.radiobutton.fortid', value: 'before' }
            ]
        });

        const antallBarnRadioList = renderRadioList({
            intl,
            titleIntlId: 'relasjonBarn.text.antallBarn',
            action: (value: string) => dispatch(soknad.setAntallBarn(value)),
            name: 'antallBarn',
            selectedValue: this.getAntallBarnSelectedValue(antallBarn),
            options: [
                { labelIntlId: 'relasjonBarn.radiobutton.ettbarn', value: 'ett' },
                { labelIntlId: 'relasjonBarn.radiobutton.tvillinger', value: 'tvillinger' },
                { labelIntlId: 'relasjonBarn.radiobutton.flere', value: 'flere' }
            ]
        });

        return (
            <div className="engangsstonad__step">
                <DocumentTitle title="NAV Engangsstønad - Relasjon til barn" />
                {fodselTidspunktRadioList}

                {barnErFodt === true && (
                    <DateInput
                        id="fodselsdato"
                        label={getMessage(intl, 'relasjonBarn.text.fodselsdato')}
                        inputProps={{ value: relasjonTilBarn && (relasjonTilBarn as RelasjonTilFodtBarn).fodselsdato }}
                        onChange={(e) => dispatch(soknad.setFodselsdato(e))}
                    />
                )}

                {barnErFodt === false && antallBarnRadioList}
                {barnErFodt === false && antallBarn &&  (
                    <DateInput
                        id="termindato"
                        label={getMessage(intl, 'relasjonBarn.text.termindato')}
                        inputProps={{ value: relasjonTilBarn && (relasjonTilBarn as RelasjonTilUfodtBarn).terminDato }}
                        onChange={(e) => dispatch(soknad.setTerminDato(e))}
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
                    <DateInput
                        id="terminbekreftelse"
                        key="dateInputTerminBekreftelse"
                        inputProps={{ value: relasjonTilBarn && (relasjonTilBarn as RelasjonTilUfodtBarn).utstedtDato }}
                        label={getMessage(intl, 'relasjonBarn.text.datoTerminbekreftelse')}
                        onChange={(e) => dispatch(soknad.setUtstedtDato(e))}
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

// tslint:disable-next-line no-any
const mapStateToProps = (state: any) => ({
    relasjonTilBarn: state.soknadReducer.relasjonTilBarn,
    barnErFodt: state.soknadReducer.barnErFodt,
    person: state.commonReducer.person
});

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(EngangsstonadStep1));