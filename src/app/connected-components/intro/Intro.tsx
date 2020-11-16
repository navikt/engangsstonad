import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
const { ValidGroup, ValidForm } = require('../../lib') as any;
const { Ingress } = require('nav-frontend-typografi');
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
import { Innholdstittel } from 'nav-frontend-typografi';
import { DispatchProps } from 'common/redux/types';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veiviser from 'components/veiviser/VeiviserSvg';
import { AppState } from 'reducers/reducers';
import { Språkkode } from 'intl/types';

import '../../styles/engangsstonad.less';

interface StateProps {
    person: Person;
    godkjentVilkar: boolean;
    språkkode: Språkkode;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

const Intro: React.FunctionComponent<Props> = ({ dispatch, person, språkkode, history }) => {
    const intl = useIntl();
    const [isPlikterModalOpen, setIsPlikterModalOpen] = useState<boolean>(false);
    const [isPersonopplysningerModalOpen, setIsPersonopplysningerModalOpen] = useState<boolean>(false);
    const [godkjentVilkår, setGodkjentVilkår] = useState<boolean>(false);

    const openPlikterModal = (e: React.SyntheticEvent<HTMLElement>) => {
        e.preventDefault();
        setIsPlikterModalOpen(true);
    };

    const openPersonopplysningerModal = (e: React.SyntheticEvent<HTMLElement>) => {
        e.preventDefault();
        setIsPersonopplysningerModalOpen(true);
    };

    const closePersonopplysningerModal = () => {
        setIsPersonopplysningerModalOpen(false);
    };

    const closePlikterModal = () => {
        setIsPlikterModalOpen(false);
    };

    const bekreftetVilkarChange = () => {
        setGodkjentVilkår(!godkjentVilkår);
    };

    const startNySøknad = () => {
        if (godkjentVilkår) {
            dispatch(common.setGodkjentVilkar(true));
            history.push('/engangsstonad/soknad');
        }
    };

    const toggleLanguage = (språkkodeValue: Språkkode) => {
        dispatch(common.setLanguage(språkkodeValue));
    };

    const confirmBoxLabelHeaderText = () => {
        return (
            <FormattedMessage
                id="intro.text.samtykkeIntro"
                values={{
                    link: (
                        <a className="lenke" href="#" onClick={(e) => openPlikterModal(e)}>
                            <FormattedMessage id="intro.text.samtykke.link" />
                        </a>
                    ),
                }}
            />
        );
    };

    const getGodkjentVilkarValidators = () => {
        return [
            {
                test: () => godkjentVilkår === true,
                failText: getMessage(intl, 'valideringsfeil.godkjentVilkar'),
            },
        ];
    };

    return (
        <div id="js-intro">
            <Skjemasteg>
                <ValidForm noSummary={true} onSubmit={startNySøknad}>
                    <LanguageToggle
                        språkkode={språkkode}
                        toggleLanguage={(språkkodeValue: Språkkode) => toggleLanguage(språkkodeValue)}
                    />
                    <SimpleIllustration
                        dialog={{
                            title: getMessage(intl, 'intro.standard.bobletittel', {
                                name: person.fornavn.toLowerCase(),
                            }),
                            text: getMessage(intl, 'intro.standard.bobletekst'),
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
                                <FormattedMessage
                                    id="intro.text.veiviser.lenke"
                                    values={{
                                        a: (msg: any) => (
                                            <a
                                                className="lenke"
                                                rel="noopener noreferrer"
                                                href="https://familie.nav.no/veiviser"
                                                target="_blank"
                                            >
                                                {msg}
                                            </a>
                                        ),
                                    }}
                                />
                            </Veilederpanel>
                        </div>

                        <div className="blokk-m">
                            <div className="es-skjema__feilomrade--ingenBakgrunnsfarge">
                                <ValidGroup validators={getGodkjentVilkarValidators()}>
                                    <BekreftCheckboksPanel
                                        inputProps={{
                                            name: 'egenerklaring',
                                        }}
                                        label={getMessage(intl, 'intro.text.samtykke')}
                                        onChange={bekreftetVilkarChange}
                                        checked={godkjentVilkår}
                                    >
                                        <span>{confirmBoxLabelHeaderText()}</span>
                                    </BekreftCheckboksPanel>
                                </ValidGroup>
                            </div>
                        </div>

                        <div className="blokk-m">
                            <Hovedknapp className="responsiveButton">
                                {getMessage(intl, 'intro.button.startSøknad')}
                            </Hovedknapp>
                        </div>

                        <div className="blokk-m personopplysningLenke">
                            <a className="lenke" href="#" onClick={(e) => openPersonopplysningerModal(e)}>
                                <FormattedMessage id="intro.text.personopplysningene.link" />
                            </a>
                        </div>

                        <Modal
                            isOpen={isPlikterModalOpen}
                            closeButton={true}
                            onRequestClose={() => closePlikterModal()}
                            contentLabel="rettigheter og plikter"
                        >
                            <Plikter />
                        </Modal>
                        <Modal
                            isOpen={isPersonopplysningerModalOpen}
                            closeButton={true}
                            onRequestClose={() => closePersonopplysningerModal()}
                            contentLabel="rettigheter og plikter"
                        >
                            <Personopplysninger />
                        </Modal>
                    </div>
                </ValidForm>
            </Skjemasteg>
        </div>
    );
};

const mapStateToProps = (state: AppState) => ({
    person: state.apiReducer.person!,
    godkjentVilkar: state.commonReducer.godkjentVilkar,
    språkkode: state.commonReducer.språkkode,
});
export default connect<StateProps>(mapStateToProps)(Intro);
