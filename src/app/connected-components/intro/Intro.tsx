import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from 'react-router';

const { ValidGroup, ValidForm } = require('../../lib') as any;
const { Ingress } = require('nav-frontend-typografi');
import { Hovedknapp } from 'nav-frontend-knapper';
const Modal = require('nav-frontend-modal').default;
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';

import Plikter from 'components/modal-content/Plikter';
import Personopplysninger from 'components/modal-content/Personopplysninger';
import Skjemasteg from 'components/skjemasteg/Skjemasteg';

import { commonActionCreators as common, soknadActionCreators as soknad, stepActionCreators as step } from '../../redux/actions';
import { getDefaultState } from 'reducers/stepReducer';
import LanguageToggle from '../../intl/LanguageToggle';
import getMessage from '../../util/i18n/i18nUtils';
import Person from '../../types/domain/Person';
import { ExternalProps } from '../../types/index';
import SimpleIllustration from 'components/simple-illustration/SimpleIllustration';
import { Innholdstittel } from 'nav-frontend-typografi';
import { DispatchProps } from 'common/redux/types';

import '../../styles/engangsstonad.less';
import Veilederinfo from 'components/veileder-info/Veilederinfo';
import FormBlock from 'components/form-block/FormBlock';
import RadioPanelGruppeResponsive from 'components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';

interface OwnProps {
    isPersonopplysningerModalOpen: boolean;
    isPlikterModalOpen: boolean;
    nySøknad: boolean;
    godkjentVilkår: boolean;
}

interface StateProps {
    person: Person;
    godkjentVilkar: boolean;
    language: string;
    mellomlagretSøknad: boolean;
}

type Props = StateProps & DispatchProps & InjectedIntlProps & ExternalProps & RouteComponentProps<{}>;
class Intro extends React.Component<Props, OwnProps> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isPersonopplysningerModalOpen: false,
            isPlikterModalOpen: false,
            nySøknad: !props.mellomlagretSøknad,
            godkjentVilkår: false
        };

        this.bekreftetVilkarChange = this.bekreftetVilkarChange.bind(this);
        this.startSøknad = this.startSøknad.bind(this);
    }

    resetAppState() {
        const { dispatch } = this.props;
        dispatch(step.setActiveStep(getDefaultState().activeStep));
        dispatch(soknad.resetSøknad());
        dispatch(common.setBekreftetInformasjon(false));
        dispatch(common.setGodkjentVilkar(false));
    }

    componentDidMount() {
        setTimeout(()   => (window as any).hj('vpv', '/engangsstonad/start'), 5000);
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
        this.setState({ godkjentVilkår: !this.state.godkjentVilkår});
    }

    startSøknad() {
        this.state.nySøknad ? this.startNySøknad() : this.fortsettSøknad();
    }

    fortsettSøknad() {
        if (this.props.godkjentVilkar) {
            this.props.history.push('/engangsstonad/soknad');
        }
    }

    startNySøknad() {
        if (this.props.mellomlagretSøknad) {
            this.resetAppState();
            
        }
        if (this.state.godkjentVilkår) {
            this.props.dispatch(common.setGodkjentVilkar(true));
            this.props.history.push('/engangsstonad/soknad');
        }
    }

    toggleLanguage(languageCode: string) {
        this.props.dispatch(common.setLanguage(languageCode));
    }

    confirmBoxLabelHeaderText() {
        return (
            <FormattedMessage
                id="intro.text.samtykkeIntro"
                values={{
                    link: (
                        <a className="lenke" href="#" onClick={e => this.openPlikterModal(e)}>
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

    handleFortsettSøknadToggle(toggleValue: string) {
        if (toggleValue === 'nySøknad') {
            this.setState({ nySøknad: true });
        } else {
            this.setState({ nySøknad: false });
        }
    }

    render() {
        const { intl, person } = this.props;

        return (
            <div id="js-intro">
                <Skjemasteg>
                    <ValidForm noSummary={true} onSubmit={this.startSøknad}>
                        <LanguageToggle language={this.props.language} toggleLanguage={(languageCode: string) => this.toggleLanguage(languageCode)} />
                        <SimpleIllustration
                            dialog={{
                                title: getMessage(intl, 'intro.standard.bobletittel', { name: person.fornavn.toLowerCase() }),
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

                            <FormBlock visible={this.props.mellomlagretSøknad}>
                            <RadioPanelGruppeResponsive
                                legend={getMessage(intl, 'intro.text.fortsettSøknadSpørsmål')}
                                name="fortsettSøknadSpørsmål"
                                onChange={(event: any, value: string) => this. handleFortsettSøknadToggle(value)}
                                checked={this.state.nySøknad ? 'nySøknad' : 'fortsettSøknad'}
                                radios={[
                                    {
                                        inputProps: { id: 'js-nySøknad' },
                                        label: getMessage(intl, 'intro.text.startNySøknad'),
                                        value: 'nySøknad'
                                    },
                                    {
                                        inputProps: { id: 'js-fortsettSøknad' },
                                        label: getMessage(intl, 'intro.text.fortsettSøknad'),
                                        value: 'fortsettSøknad'
                                    }
                                ]}
                                twoColumns={true}
                            />
                        </FormBlock>

                        {this.props.mellomlagretSøknad && this.state.nySøknad &&
                            <div className="blokk-m">
                                <Veilederinfo type="advarsel" >{getMessage(intl, 'intro.text.nySøknadAdvarsel')}</Veilederinfo>
                             </div>
                        }

                            {this.state.nySøknad === true && 
                            <div className="blokk-m">
                                <div className="es-skjema__feilomrade--ingenBakgrunnsfarge">
                                    <ValidGroup validators={this.getGodkjentVilkarValidators()}>
                                        <BekreftCheckboksPanel
                                            inputProps={{ name: 'egenerklaring' }}
                                            label={getMessage(intl, 'intro.text.samtykke')}
                                            onChange={this.bekreftetVilkarChange}
                                            checked={this.state.godkjentVilkår}
                                        >
                                            <span>{this.confirmBoxLabelHeaderText()}</span>
                                        </BekreftCheckboksPanel>
                                    </ValidGroup>
                                </div>
                            </div>
                            }
                            <div className="blokk-m">
                                <Hovedknapp 
                                    className="responsiveButton"
                                >
                                    {getMessage(intl, this.state.nySøknad ? 'intro.button.startSøknad' : 'intro.button.fortsettSøknad')}
                                </Hovedknapp>
                            </div>

                            <div className="blokk-m personopplysningLenke">
                                <a className="lenke" href="#" onClick={e => this.openPersonopplysningerModal(e)}>
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
                    </ValidForm>
                </Skjemasteg>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    person: state.apiReducer.person,
    godkjentVilkar: state.commonReducer.godkjentVilkar,
    language: state.commonReducer.language,
    mellomlagretSøknad: state.apiReducer.mellomlagretSøknad,
});
export default connect<StateProps>(mapStateToProps)(injectIntl(Intro));
