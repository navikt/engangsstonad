import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, InjectedIntlProps, FormattedHTMLMessage } from 'react-intl';

import { Hovedknapp } from 'nav-frontend-knapper';
const Modal = require('nav-frontend-modal').default;
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';

import Plikter from 'components/modal-content/Plikter';
import Personopplysninger from 'components/modal-content/Personopplysninger';
import Skjemasteg from 'components/skjemasteg/Skjemasteg';

import { commonActionCreators as common } from '../../redux/actions';
import LanguageToggle from '../../intl/LanguageToggle';
import getMessage from 'common/util/i18nUtils';
import Person from '../../types/domain/Person';
import { RouteComponentProps } from 'react-router-dom';
import SimpleIllustration from 'components/simple-illustration/SimpleIllustration';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';
import { DispatchProps } from 'common/redux/types';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veiviser from 'components/veiviser/VeiviserSvg';

import { AppState } from 'reducers/reducers';
import { Language } from 'intl/IntlProvider';

import '../../styles/engangsstonad.less';

interface State {
    isPersonopplysningerModalOpen: boolean;
    isPlikterModalOpen: boolean;
    godkjentVilkår: boolean;
}

interface StateProps {
    person: Person;
    godkjentVilkar: boolean;
    language: Language;
}

type Props = StateProps & DispatchProps & InjectedIntlProps & RouteComponentProps;
class Intro extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isPersonopplysningerModalOpen: false,
            isPlikterModalOpen: false,
            godkjentVilkår: false
        };
        this.bekreftetVilkarChange = this.bekreftetVilkarChange.bind(this);
        this.startNySøknad = this.startNySøknad.bind(this);
    }

    openPlikterModal(e: React.SyntheticEvent<HTMLElement>) {
        e.preventDefault();
        this.setState({ isPlikterModalOpen: true });
    }

    openPersonopplysningerModal(e: React.SyntheticEvent<HTMLElement>) {
        e.preventDefault();
        this.setState({ isPersonopplysningerModalOpen: true });
    }

    closePersonopplysningerModal() {
        this.setState({ isPersonopplysningerModalOpen: false });
    }

    closePlikterModal() {
        this.setState({ isPlikterModalOpen: false });
    }

    bekreftetVilkarChange() {
        this.setState({ godkjentVilkår: !this.state.godkjentVilkår });
    }

    startNySøknad() {
        if (this.state.godkjentVilkår) {
            this.props.dispatch(common.setGodkjentVilkar(true));
            this.props.history.push('/engangsstonad/soknad');
        }
    }

    toggleLanguage(language: Language) {
        this.props.dispatch(common.setLanguage(language));
    }

    confirmBoxLabelHeaderText() {
        return (
            <FormattedMessage
                id="intro.text.samtykkeIntro"
                values={{
                    link: (
                        <a className="lenke" href="#" onClick={(e) => this.openPlikterModal(e)}>
                            <FormattedMessage id="intro.text.samtykke.link" />
                        </a>
                    )
                }}
            />
        );
    }

    getGodkjentVilkarValidators() {
        const { intl } = this.props;
        return [
            {
                test: () => this.state.godkjentVilkår === true,
                failText: getMessage(intl, 'valideringsfeil.godkjentVilkar')
            }
        ];
    }

    render() {
        const { intl, person } = this.props;

        return (
            <div id="js-intro">
                <Skjemasteg>
                    <form onSubmit={this.startNySøknad}>
                        <LanguageToggle
                            language={this.props.language}
                            toggleLanguage={(language: Language) => this.toggleLanguage(language)}
                        />
                        <SimpleIllustration
                            dialog={{
                                title: getMessage(intl, 'intro.standard.bobletittel', {
                                    name: person.fornavn.toLowerCase()
                                }),
                                text: getMessage(intl, 'intro.standard.bobletekst')
                            }}
                        />
                        <div className="responsiveContainer">
                            <div className="blokk-s">
                                <Innholdstittel>{getMessage(intl, 'intro.standard.velkommentittel')}</Innholdstittel>
                            </div>
                            <div className="blokk-m">
                                <Ingress>{getMessage(intl, 'intro.standard.ingress')}</Ingress>
                            </div>
                            <div className="blokk-m">
                                <Veilederpanel kompakt={true} svg={<Veiviser />}>
                                    <FormattedMessage id="intro.text.veiviser" />
                                    <br />
                                    <br />
                                    <FormattedHTMLMessage id="intro.text.veiviser.lenke" />
                                </Veilederpanel>
                            </div>

                            <div className="blokk-m">
                                <div className="es-skjema__feilomrade--ingenBakgrunnsfarge">
                                        <BekreftCheckboksPanel
                                            inputProps={{
                                                name: 'egenerklaring'
                                            }}
                                            label={getMessage(intl, 'intro.text.samtykke')}
                                            onChange={this.bekreftetVilkarChange}
                                            checked={this.state.godkjentVilkår}
                                        >
                                            <span>{this.confirmBoxLabelHeaderText()}</span>
                                        </BekreftCheckboksPanel>
                                </div>
                            </div>

                            <div className="blokk-m">
                                <Hovedknapp className="responsiveButton">
                                    {getMessage(intl, 'intro.button.startSøknad')}
                                </Hovedknapp>
                            </div>

                            <div className="blokk-m personopplysningLenke">
                                <a className="lenke" href="#" onClick={(e) => this.openPersonopplysningerModal(e)}>
                                    <FormattedMessage id="intro.text.personopplysningene.link" />
                                </a>
                            </div>

                            <Modal
                                isOpen={this.state.isPlikterModalOpen}
                                closeButton={true}
                                onRequestClose={() => this.closePlikterModal()}
                                contentLabel="rettigheter og plikter"
                            >
                                <Plikter />
                            </Modal>
                            <Modal
                                isOpen={this.state.isPersonopplysningerModalOpen}
                                closeButton={true}
                                onRequestClose={() => this.closePersonopplysningerModal()}
                                contentLabel="rettigheter og plikter"
                            >
                                <Personopplysninger />
                            </Modal>
                        </div>
                    </form>
                </Skjemasteg>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    person: state.apiReducer.person!,
    godkjentVilkar: state.commonReducer.godkjentVilkar,
    language: state.commonReducer.language
});
export default connect<StateProps>(mapStateToProps)(injectIntl(Intro));
