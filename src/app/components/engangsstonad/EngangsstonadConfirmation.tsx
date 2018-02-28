import  * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import * as moment from 'moment';
const { ValidGroup, ValidForm } = require('./../../lib') as any;
const { Ingress } = require('nav-frontend-typografi');
import { Hovedknapp } from 'nav-frontend-knapper';
const Modal = require('nav-frontend-modal').default;
import RettigheterOgPlikter from 'shared/modal-content/RettigheterOgPlikter';
import BekreftCheckbox from 'shared/bekreft-checkbox/BekreftCheckbox';
import HeaderIllustration, { Theme } from 'shared/header-illustration/HeaderIllustration';
const VelkommenIllustration = require('assets/svg/frontpage.svg').default;
import { commonActionCreators as common } from '../../redux/actions';
import LanguageToggle from '../intl/LanguageToggle';
import getMessage from '../../util/i18n/i18nUtils';
import { DispatchProps } from '../../redux/types/index';
import './engangsstonad.less';
import Person from '../../types/domain/Person';
import { ExternalProps } from '../../types/index';

interface OwnProps {
    isModalOpen: boolean;
}

interface StateProps {
    person: Person;
    godkjentVilkar: boolean;
    language: string;
}

type Props = StateProps & DispatchProps & InjectedIntlProps & ExternalProps;
export class EngangsstonadConfirmation extends React.Component<Props, OwnProps> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isModalOpen: false
        };

        this.bekreftetVilkarChange = this.bekreftetVilkarChange.bind(this);
        this.startSoknad = this.startSoknad.bind(this);
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
        this.props.history.push('/engangsstonad/soknad');
    }

    toggleLanguage(languageCode: string) {
        this.props.dispatch(common.setLanguage(languageCode));
    }

    confirmBoxLabelHeaderText() {
        return(
            <FormattedMessage
                id="intro.text.samtykkeIntro"
                values={{
                    link: (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a href="#" onClick={(e) => this.openRettigheterOgPlikterModal(e)}>
                            <FormattedMessage id="intro.text.samtykke.link" />
                        </a>
                    )
                }}
            />
        );
    }

    getGodkjentVilkarValidators() {
        const { godkjentVilkar } = this.props;
        return [
            { test: () => godkjentVilkar === true, failText: 'Du må bekrefte at du har lest og forstått'}
        ];
    }

    render() {
        const { person, godkjentVilkar, intl } = this.props;

        if (!person) {
            return null;
        }

        const now = moment();
        const birthDate = moment(person.fodselsdato);
        if (now.diff(birthDate, 'years') < 18) {
            this.props.history.push('/engangsstonad/underAge');
        }

        return (
            <ValidForm summaryTitle="Du må rette opp i følgende feil:" noSummary={true} onSubmit={this.startSoknad}>
                <div className="engangsstonad">
                    <DocumentTitle title="Samtykke - NAV Engangsstønad" />
                    <LanguageToggle
                        language={this.props.language}
                        toggleLanguage={(languageCode: string) => this.toggleLanguage(languageCode)}
                    />
                    <HeaderIllustration
                        dialog={{
                            title: getMessage(intl, 'intro.snakkeboble.overskrift', {
                                name: this.props.person.fornavn
                            }),
                            text: getMessage(intl, 'intro.text.hjelpedeg')
                        }}
                        svg={VelkommenIllustration}
                        theme={Theme.purple}
                        title={getMessage(intl, 'intro.pageheading.soknadES')}
                    />
                    <Ingress>{getMessage(intl, 'intro.text.omES')}</Ingress>
                    <ValidGroup validators={this.getGodkjentVilkarValidators()}>
                        <BekreftCheckbox
                            name="egenerklaring"
                            text={this.confirmBoxLabelHeaderText()}
                            label={getMessage(intl, 'intro.text.samtykke')}
                            onChange={this.bekreftetVilkarChange}
                            checked={godkjentVilkar}
                        />
                    </ValidGroup>
                    <div className="engangsstonad__centerButton">
                        <Hovedknapp>
                            {getMessage(intl, 'intro.button.startSoknad')}
                        </Hovedknapp>
                    </div>
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
        );
    }
}

const mapStateToProps = (state: any) => ({
    person: state.apiReducer.person,
    godkjentVilkar: state.commonReducer.godkjentVilkar,
    language: state.commonReducer.language
});
export default connect<StateProps>(mapStateToProps)(injectIntl(EngangsstonadConfirmation));
