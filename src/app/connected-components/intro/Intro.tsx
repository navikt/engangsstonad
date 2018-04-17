import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
const { ValidGroup, ValidForm } = require('../../lib') as any;
const { Ingress } = require('nav-frontend-typografi');
import { Hovedknapp } from 'nav-frontend-knapper';
const Modal = require('nav-frontend-modal').default;
const { BekreftCheckboksPanel } = require('nav-frontend-skjema');

import RettigheterOgPlikter from 'components/modal-content/RettigheterOgPlikter';
import { commonActionCreators as common, soknadActionCreators as soknad, stepActionCreators as step } from '../../redux/actions';
import { getDefaultState } from 'reducers/stepReducer';
import LanguageToggle from '../../intl/LanguageToggle';
import getMessage from '../../util/i18n/i18nUtils';
import { DispatchProps } from '../../redux/types/index';
import Person from '../../types/domain/Person';
import { ExternalProps } from '../../types/index';
import SimpleIllustration from 'components/simple-illustration/SimpleIllustration';
import { Innholdstittel } from 'nav-frontend-typografi';

import '../../styles/engangsstonad.less';

interface OwnProps {
    isModalOpen: boolean;
}

interface StateProps {
    person: Person;
    godkjentVilkar: boolean;
    language: string;
}

type Props = StateProps & DispatchProps & InjectedIntlProps & ExternalProps;
export class Intro extends React.Component<Props, OwnProps> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isModalOpen: false
        };

        this.bekreftetVilkarChange = this.bekreftetVilkarChange.bind(this);
        this.startSoknad = this.startSoknad.bind(this);

        const { dispatch } = this.props;
        dispatch(step.setActiveStep(getDefaultState().activeStep));
        dispatch(soknad.resetSøknad());
        dispatch(common.setBekreftetInformasjon(false));
        dispatch(common.setGodkjentVilkar(false));
    }

    openRettigheterOgPlikterModal(e: React.SyntheticEvent<HTMLElement>) {
        e.preventDefault();
        this.setState({ isModalOpen: true });
    }

    closeRettigheterOgPlikterModal() {
        this.setState({ isModalOpen: false });
    }

    bekreftetVilkarChange() {
        const { godkjentVilkar } = this.props;
        this.props.dispatch(common.setGodkjentVilkar(!godkjentVilkar));
    }

    startSoknad() {
        const { godkjentVilkar } = this.props;
        if (godkjentVilkar) {
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
                        <a className="lenke" href="#" onClick={e => this.openRettigheterOgPlikterModal(e)}>
                            <FormattedMessage id="intro.text.samtykke.link" />
                        </a>
                    )
                }}
            />
        );
    }

    getGodkjentVilkarValidators() {
        const { godkjentVilkar, intl } = this.props;
        return [
            {
                test: () => godkjentVilkar === true,
                failText: getMessage(intl, 'valideringsfeil.godkjentVilkar')
            }
        ];
    }

    render() {
        const { godkjentVilkar, intl, person } = this.props;

        return (
            <div id="js-intro">
                <ValidForm noSummary={true} onSubmit={this.startSoknad}>
                    <DocumentTitle title="Samtykke - NAV Engangsstønad" />
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
                        <div className="blokk-m">
                            <ValidGroup validators={this.getGodkjentVilkarValidators()}>
                                <BekreftCheckboksPanel
                                    inputProps={{ name: 'egenerklaring' }}
                                    label={getMessage(intl, 'intro.text.samtykke')}
                                    onChange={this.bekreftetVilkarChange}
                                    checked={godkjentVilkar}
                                >
                                    <span>{this.confirmBoxLabelHeaderText()}</span>
                                </BekreftCheckboksPanel>
                            </ValidGroup>
                        </div>
                        <Hovedknapp className="responsiveButton">{getMessage(intl, 'intro.button.startSoknad')}</Hovedknapp>
                        <Modal
                            isOpen={this.state.isModalOpen}
                            closeButton={true}
                            onRequestClose={() => this.closeRettigheterOgPlikterModal()}
                            contentLabel="rettigheter og plikter"
                        >
                            <RettigheterOgPlikter />
                        </Modal>
                    </div>
                </ValidForm>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    person: state.apiReducer.person,
    godkjentVilkar: state.commonReducer.godkjentVilkar,
    language: state.commonReducer.language
});
export default connect<StateProps>(mapStateToProps)(injectIntl(Intro));
