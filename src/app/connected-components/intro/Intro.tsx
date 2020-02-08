import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, FormattedHTMLMessage, WrappedComponentProps } from 'react-intl';
import { RouteComponentProps } from 'react-router-dom';

import { Hovedknapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';

import Plikter from 'components/modal-content/Plikter';
import Personopplysninger from 'components/modal-content/Personopplysninger';
import SimpleIllustration from 'components/simple-illustration/SimpleIllustration';
import Veiviser from 'components/veiviser/VeiviserSvg';
import Skjemasteg from 'components/skjemasteg/Skjemasteg';

import getMessage from 'common/util/i18nUtils';
import { DispatchProps } from 'common/redux/types';
import { AppState } from 'reducers/index';
import { Language } from 'intl/IntlProvider';

import { commonActionCreators as common } from '../../redux/actions';
import LanguageToggle from '../../intl/LanguageToggle';
import Person from '../../types/domain/Person';

import '../../styles/engangsstonad.less';

interface State {
    isPersonopplysningerModalOpen: boolean;
    isPlikterModalOpen: boolean;
}

interface StateProps {
    person: Person;
    godkjentVilkår: boolean;
    language: Language;
}

type Props = StateProps & DispatchProps & WrappedComponentProps & RouteComponentProps;
class Intro extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isPersonopplysningerModalOpen: false,
            isPlikterModalOpen: false
        };
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

    startNySøknad(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (this.props.godkjentVilkår) {
            this.props.history.push('/engangsstonad/soknad');
        }
    }

    toggleLanguage(language: Language) {
        this.props.dispatch(common.setLanguage(language));
    }

    render() {
        const { intl, person, godkjentVilkår, language, dispatch } = this.props;
        console.log(godkjentVilkår);
        return (
            <div id="js-intro">
                <Skjemasteg>
                    <form onSubmit={this.startNySøknad}>
                        <LanguageToggle
                            language={language}
                            toggleLanguage={(lang: Language) => this.toggleLanguage(lang)}
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
                                <BekreftCheckboksPanel
                                    inputProps={{
                                        name: 'egenerklaring'
                                    }}
                                    label={getMessage(intl, 'intro.text.samtykke')}
                                    onChange={() => dispatch(common.setGodkjentVilkar(!godkjentVilkår))}
                                    checked={godkjentVilkår}
                                >
                                    <span>
                                        <FormattedMessage
                                            id="intro.text.samtykkeIntro"
                                            values={{
                                                link: (
                                                    <a
                                                        className="lenke"
                                                        href="#"
                                                        onClick={(e) => this.openPlikterModal(e)}
                                                    >
                                                        <FormattedMessage id="intro.text.samtykke.link" />
                                                    </a>
                                                )
                                            }}
                                        />
                                    </span>
                                </BekreftCheckboksPanel>
                            </div>

                            <div className="blokk-m">
                                <Hovedknapp className="responsiveButton" disabled={!godkjentVilkår}>
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
                                onRequestClose={() => this.setState({ isPlikterModalOpen: false })}
                                contentLabel="rettigheter og plikter"
                            >
                                <Plikter />
                            </Modal>
                            <Modal
                                isOpen={this.state.isPersonopplysningerModalOpen}
                                closeButton={true}
                                onRequestClose={() => this.setState({ isPersonopplysningerModalOpen: false })}
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
    godkjentVilkår: state.commonReducer.godkjentVilkår,
    language: state.commonReducer.language
});
export default connect<StateProps>(mapStateToProps)(injectIntl(Intro));
