import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedHTMLMessage, useIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router-dom';

import { Hovedknapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';

import Plikter from 'components/modal-content/Plikter';
import Personopplysninger from 'components/modal-content/Personopplysninger';
import SimpleIllustration from 'components/simple-illustration/SimpleIllustration';
import Veiviser from 'components/ikoner/flags/veiviser/VeiviserSvg';

import getMessage from 'common/util/i18nUtils';
import { DispatchProps } from 'common/redux/types';
import { AppState } from 'reducers/index';
import { Language } from 'intl/IntlProvider';

import { commonActionCreators as common } from '../../redux/actions';
import LanguageToggle from '../../intl/LanguageToggle';
import Person from '../../types/domain/Person';

import '../../styles/engangsstonad.less';

interface StateProps {
    person: Person;
    godkjentVilkår: boolean;
    language: Language;
}

type Props = StateProps & DispatchProps & RouteComponentProps;
const Intro: React.FunctionComponent<Props> = ({ person, godkjentVilkår, language, dispatch, history }) => {
    const intl = useIntl();
    const [isPlikterModalOpen, setIsPlikterModalOpen] = React.useState(false);
    const [isPersonopplysningerModalOpen, setIsPersonopplysningerModalOpen] = React.useState(false);

    const openPlikterModal = (e: React.SyntheticEvent<HTMLElement>) => {
        e.preventDefault();
        setIsPlikterModalOpen(true);
    };

    const openPersonopplysningerModal = (e: React.SyntheticEvent<HTMLElement>) => {
        e.preventDefault();
        setIsPersonopplysningerModalOpen(true);
    };

    const startNySøknad = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (godkjentVilkår) {
            history.push('/engangsstonad/soknad');
        }
    };

    return (
        <div id="js-intro">
                <LanguageToggle
                    language={language}
                    toggleLanguage={(lang: Language) => dispatch(common.setLanguage(lang))}
                />
                <SimpleIllustration
                    dialog={{
                        title: getMessage(intl, 'intro.standard.bobletittel', {
                            name: person.fornavn.toLowerCase()
                        }),
                        text: getMessage(intl, 'intro.standard.bobletekst')
                    }}
                />

                <form onSubmit={startNySøknad} className="responsiveContainer">
                    <Innholdstittel className="blokk-s">
                        <FormattedMessage id="intro.standard.velkommentittel" />
                    </Innholdstittel>

                    <Ingress className="blokk-m">
                        <FormattedMessage id="intro.standard.ingress" />
                    </Ingress>

                    <div className="blokk-m">
                        <Veilederpanel kompakt={true} svg={<Veiviser />}>
                            <FormattedMessage id="intro.text.veiviser" />
                            <br />
                            <br />
                            <FormattedHTMLMessage id="intro.text.veiviser.lenke" />
                        </Veilederpanel>
                    </div>

                    <BekreftCheckboksPanel
                        className="blokk-m"
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
                                        <a className="lenke" href="#" onClick={openPlikterModal}>
                                            <FormattedMessage id="intro.text.samtykke.link" />
                                        </a>
                                    )
                                }}
                            />
                        </span>
                    </BekreftCheckboksPanel>

                    <div className="blokk-m">
                        <Hovedknapp className="responsiveButton" disabled={!godkjentVilkår}>
                            <FormattedMessage id="intro.button.startSøknad" />
                        </Hovedknapp>
                    </div>

                    <div className="blokk-m personopplysningLenke">
                        <a className="lenke" href="#" onClick={openPersonopplysningerModal}>
                            <FormattedMessage id="intro.text.personopplysningene.link" />
                        </a>
                    </div>

                    <Modal
                        isOpen={isPlikterModalOpen}
                        closeButton={true}
                        onRequestClose={() => setIsPlikterModalOpen(false)}
                        contentLabel="rettigheter og plikter"
                    >
                        <Plikter />
                    </Modal>

                    <Modal
                        isOpen={isPersonopplysningerModalOpen}
                        closeButton={true}
                        onRequestClose={() => setIsPersonopplysningerModalOpen(false)}
                        contentLabel="rettigheter og plikter"
                    >
                        <Personopplysninger />
                    </Modal>
                </form>
        </div>
    );
};

const mapStateToProps = (state: AppState) => ({
    person: state.apiReducer.person!,
    godkjentVilkår: state.commonReducer.godkjentVilkår,
    language: state.commonReducer.language
});
export default connect<StateProps>(mapStateToProps)(Intro);
