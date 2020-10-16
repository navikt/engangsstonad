import React from 'react';
import { useIntl } from 'react-intl';
import * as moment from 'moment';
import getMessage from 'common/util/i18nUtils';
import { soknadActionCreators as soknad } from '../../redux/actions';
import InformasjonOmUtenlandsopphold, { Utenlandsopphold } from '../../types/domain/InformasjonOmUtenlandsopphold';
import { DispatchProps } from 'common/redux/types';
import CountryPicker from '../../components/country-picker/CountryPicker';
import Barn from '../../types/domain/Barn';
import RadioPanelGruppeResponsive from 'components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import FormBlock from 'components/form-block/FormBlock';
import { Tidsperiode } from 'nav-datovelger';
import { Feil } from 'components/skjema-input-element/types';
import Skjemasteg from 'components/skjemasteg/Skjemasteg';
import { connect } from 'react-redux';
import { AppState } from 'reducers/reducers';
import { Språkkode } from 'intl/types';

interface StateProps {
    barn: Barn;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    språkkode: Språkkode;
}

type Props = StateProps & DispatchProps;

const Steg3: React.FunctionComponent<Props> = ({ dispatch, informasjonOmUtenlandsopphold, språkkode }) => {
    const intl = useIntl();

    const { iNorgeSiste12Mnd, iNorgeNeste12Mnd, tidligereOpphold, senereOpphold } = informasjonOmUtenlandsopphold;

    const tidsperiodeForegående: Tidsperiode = {
        startdato: moment().add(-1, 'years').startOf('day').toDate(),
        sluttdato: moment().endOf('day').toDate(),
    };

    const tidsperiodeKommende: Tidsperiode = {
        startdato: moment().startOf('day').toDate(),
        sluttdato: moment().add(1, 'years').endOf('day').toDate(),
    };

    const validateLand = ({ land }: any): Feil | undefined => {
        if (land) {
            return;
        }
        return { feilmelding: 'Du må oppgi et land' };
    };

    const overlapsWithOtherUtenlandsopphold = (momentFom: any, momentTom: any, utenlandsoppholdInEditMode: any) => {
        const perioder = [...tidligereOpphold, ...senereOpphold];
        const overlappendePeriode = perioder.find((periode) => {
            if (periode !== utenlandsoppholdInEditMode) {
                const { tidsperiode } = periode;
                const varighetFom = moment(tidsperiode.fom);
                const varighetTom = moment(tidsperiode.tom);
                return (
                    momentFom.isBetween(varighetFom.subtract(1, 'seconds'), varighetTom.add(1, 'seconds')) ||
                    momentTom.isBetween(varighetFom.subtract(1, 'seconds'), varighetTom.add(1, 'seconds')) ||
                    varighetFom.isBetween(momentFom.subtract(1, 'seconds'), momentTom.add(1, 'seconds')) ||
                    varighetTom.isBetween(momentFom.subtract(1, 'seconds'), momentTom.add(1, 'seconds'))
                );
            }
        });
        return overlappendePeriode;
    };

    const validateFomDatoSiste12Mnd = ({ fom, tom, utenlandsoppholdInEditMode }: any): Feil | undefined => {
        if (fom) {
            const momentFom = moment(fom);
            const momentTom = moment(tom);
            if (momentFom.isAfter(momentTom)) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.førTilDato'),
                };
            } else if (momentFom.isBefore(moment().subtract(1, 'years'))) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.innenforSiste12'),
                };
            } else if (overlapsWithOtherUtenlandsopphold(momentFom, momentTom, utenlandsoppholdInEditMode)) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.overlapper'),
                };
            }
            return;
        }
        return {
            feilmelding: getMessage(intl, 'medlemsskap.modal.feil.innenforSiste12'),
        };
    };

    const validateTomDatoSiste12Mnd = ({ tom, fom, utenlandsoppholdInEditMode }: any): Feil | undefined => {
        if (tom) {
            const momentFom = moment(fom);
            const momentTom = moment(tom);
            if (momentTom.isBefore(momentFom)) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.etterFraDato'),
                };
            } else if (momentTom.isBefore(moment().subtract(1, 'years'))) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.innenforSiste12'),
                };
            } else if (momentTom.isSameOrAfter(moment().add(1, 'days'))) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.innenforSiste12'),
                };
            } else if (overlapsWithOtherUtenlandsopphold(momentFom, momentTom, utenlandsoppholdInEditMode)) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.overlapper'),
                };
            }
            return;
        }
        return {
            feilmelding: getMessage(intl, 'medlemsskap.modal.feil.innenforSiste12'),
        };
    };

    const validateFomDatoNeste12Mnd = ({ fom, tom, utenlandsoppholdInEditMode }: any): Feil | undefined => {
        if (fom) {
            const momentFom = moment(fom);
            const momentTom = moment(tom);
            if (momentFom.isAfter(momentTom)) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.førTilDato'),
                };
            } else if (momentFom.isBefore(moment().startOf('day'))) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.innenforNeste12'),
                };
            } else if (momentFom.startOf('day').isAfter(moment().add(1, 'years'))) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.innenforNeste12'),
                };
            } else if (overlapsWithOtherUtenlandsopphold(momentFom, momentTom, utenlandsoppholdInEditMode)) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.overlapper'),
                };
            }
            return;
        }
        return {
            feilmelding: getMessage(intl, 'medlemsskap.modal.feil.innenforNeste12'),
        };
    };

    const validateTomDatoNeste12Mnd = ({ tom, fom, utenlandsoppholdInEditMode }: any): Feil | undefined => {
        if (tom) {
            const momentFom = moment(fom);
            const momentTom = moment(tom);
            if (momentTom.isBefore(momentFom)) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.etterFraDato'),
                };
            } else if (momentTom.startOf('day').isAfter(moment().add(1, 'years'))) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.innenforNeste12'),
                };
            } else if (momentTom.isBefore(moment().startOf('day'))) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.dagensEllerSenere'),
                };
            } else if (overlapsWithOtherUtenlandsopphold(momentFom, momentTom, utenlandsoppholdInEditMode)) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.overlapper'),
                };
            }
            return;
        }
        return {
            feilmelding: getMessage(intl, 'medlemsskap.modal.feil.innenforNeste12'),
        };
    };

    const getINorgeSiste12SelectedValue = () => {
        if (iNorgeSiste12Mnd === true) {
            return 'norway';
        } else if (iNorgeSiste12Mnd === false) {
            return 'abroad';
        } else {
            return undefined;
        }
    };

    const getINorgeNeste12SelectedValue = () => {
        if (iNorgeNeste12Mnd === true) {
            return 'norway';
        } else if (iNorgeNeste12Mnd === false) {
            return 'abroad';
        } else {
            return undefined;
        }
    };

    return (
        <Skjemasteg tittel={getMessage(intl, 'medlemmskap.sectionheading')}>
            <FormBlock>
                <RadioPanelGruppeResponsive
                    legend={getMessage(intl, 'medlemmskap.text.siste12mnd')}
                    name="iNorgeSiste12"
                    onChange={(event: any, value: string) => dispatch(soknad.setINorgeSiste12Mnd(value))}
                    checked={getINorgeSiste12SelectedValue()}
                    radios={[
                        {
                            inputProps: { id: 'js-iNorgeSiste12' },
                            label: getMessage(intl, 'medlemmskap.radiobutton.boddNorge'),
                            value: 'norway',
                        },
                        {
                            inputProps: { id: 'js-iUtlandetSiste12' },
                            label: getMessage(intl, 'medlemmskap.radiobutton.utlandet'),
                            value: 'abroad',
                        },
                    ]}
                    twoColumns={true}
                />
            </FormBlock>

            <FormBlock visible={iNorgeSiste12Mnd === false}>
                <CountryPicker
                    label={getMessage(intl, 'medlemmskap.text.jegBodde')}
                    språkkode={språkkode}
                    utenlandsoppholdListe={tidligereOpphold}
                    addVisit={(periode: Utenlandsopphold) =>
                        dispatch(soknad.addTidligereUtenlandsoppholdPeriode(periode))
                    }
                    editVisit={(periode: Utenlandsopphold, i: number) =>
                        dispatch(soknad.editTidligereUtenlandsoppholdPeriode(periode, i))
                    }
                    deleteVisit={(periode: Utenlandsopphold) =>
                        dispatch(soknad.deleteTidligereUtenlandsoppholdPeriode(periode))
                    }
                    tidsperiode={tidsperiodeForegående}
                    validators={{
                        validateLand,
                        validateFom: validateFomDatoSiste12Mnd,
                        validateTom: validateTomDatoSiste12Mnd,
                    }}
                />
            </FormBlock>
            <FormBlock visible={iNorgeSiste12Mnd || tidligereOpphold.length > 0}>
                <RadioPanelGruppeResponsive
                    legend={getMessage(intl, 'medlemmskap.text.neste12mnd')}
                    name="iNorgeNeste12"
                    onChange={(event: any, value: string) => dispatch(soknad.setINorgeNeste12Mnd(value))}
                    checked={getINorgeNeste12SelectedValue()}
                    radios={[
                        {
                            inputProps: { id: 'js-iNorgeNeste12' },
                            label: getMessage(intl, 'medlemmskap.radiobutton.boNorge'),
                            value: 'norway',
                        },
                        {
                            inputProps: { id: 'js-iUtlandetNeste12' },
                            label: getMessage(intl, 'medlemmskap.radiobutton.boUtlandet'),
                            value: 'abroad',
                        },
                    ]}
                    twoColumns={true}
                />
            </FormBlock>
            <FormBlock
                visible={
                    iNorgeNeste12Mnd === false &&
                    (iNorgeSiste12Mnd === true || (iNorgeSiste12Mnd === false && tidligereOpphold.length > 0))
                }
            >
                <CountryPicker
                    label={getMessage(intl, 'medlemmskap.text.jegSkalBo')}
                    språkkode={språkkode}
                    utenlandsoppholdListe={senereOpphold}
                    addVisit={(periode: Utenlandsopphold) => dispatch(soknad.addSenereUtenlandsoppholdPeriode(periode))}
                    editVisit={(periode: Utenlandsopphold, i: number) =>
                        dispatch(soknad.editSenereUtenlandsoppholdPeriode(periode, i))
                    }
                    deleteVisit={(periode: Utenlandsopphold) =>
                        dispatch(soknad.deleteSenereUtenlandsoppholdPeriode(periode))
                    }
                    tidsperiode={tidsperiodeKommende}
                    validators={{
                        validateLand,
                        validateFom: validateFomDatoNeste12Mnd,
                        validateTom: validateTomDatoNeste12Mnd,
                    }}
                />
            </FormBlock>
        </Skjemasteg>
    );
};

const mapStateToProps = (state: AppState) => ({
    informasjonOmUtenlandsopphold: state.soknadReducer.informasjonOmUtenlandsopphold,
    barn: state.soknadReducer.barn,
    språkkode: state.commonReducer.språkkode,
});

export default connect<StateProps, {}, {}>(mapStateToProps)(Steg3);
