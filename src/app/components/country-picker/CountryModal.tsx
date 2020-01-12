import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { Utenlandsopphold } from '../../types/domain/InformasjonOmUtenlandsopphold';
import CountrySelect from 'components/country-select/CountrySelect';
import DateInput from 'components/date-input/DateInput';
import { Tidsperiode, Avgrensninger } from 'nav-datovelger';
import LabelText from 'common/components/labeltekst/Labeltekst';
import FormBlock from 'components/form-block/FormBlock';
import { Feil } from 'components/skjema-input-element/types';
import { Language } from 'intl/IntlProvider';

const Modal = require('nav-frontend-modal').default;

interface OwnProps {
    language: Language;
    utenlandsopphold?: Utenlandsopphold;
    alleUtenlandsopphold?: Utenlandsopphold[];
    label: string;
    tidsperiode?: Tidsperiode;
    onSubmit: (periode: Utenlandsopphold) => void;
    closeModal: () => void;
    validateLand?: (data: any) => Feil | undefined;
    validateFom?: (data: any) => Feil | undefined;
    validateTom?: (data: any) => Feil | undefined;
}
type Props = OwnProps & InjectedIntlProps;

interface Field {
    value: any;
    feil?: Feil;
    visFeil?: boolean;
};

interface PeriodeForm {
    fom?: Field;
    tom?: Field;
    land?: Field;
}

interface State {
    erEndring?: boolean;
    hasSubmitted?: boolean;
    formData: PeriodeForm;
}

const getValidPeriode = (formData: PeriodeForm): Utenlandsopphold | undefined => {
    const { land, fom, tom } = formData;
    if (land && fom && tom) {
        return {
            land: land.value,
            tidsperiode: {
                fom: fom.value,
                tom: tom.value
            }
        };
    }
    return undefined;
};

const getDateFromString = (dato?: string) => {
    if (dato) {
        return new Date(dato);
    }
    return undefined;
};

const getRegistrertePerioder = (
    alleOpphold: Utenlandsopphold[],
    gjeldendeOpphold?: Utenlandsopphold
): Tidsperiode[] => {
    const arr = gjeldendeOpphold ? alleOpphold.filter((o) => o !== gjeldendeOpphold) : alleOpphold;
    return arr.map((opphold) => ({
        startdato: new Date(opphold.tidsperiode.fom),
        sluttdato: new Date(opphold.tidsperiode.tom)
    }));
};

const getDefaultState = (utenlandsopphold?: Utenlandsopphold): State => {
    if (utenlandsopphold) {
        return {
            erEndring: true,
            formData: {
                land: {
                    value: utenlandsopphold.land
                },
                fom: {
                    value: utenlandsopphold.tidsperiode.fom
                },
                tom: {
                    value: utenlandsopphold.tidsperiode.tom
                }
            }
        };
    }
    return {
        erEndring: false,
        hasSubmitted: false,
        formData: {}
    };
};
class CountryModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const { utenlandsopphold } = this.props;
        this.onSubmit = this.onSubmit.bind(this);
        this.updateFormState = this.updateFormState.bind(this);
        this.state = getDefaultState(utenlandsopphold);
    }

    formStateHasErrors() {
        const { formData } = this.state;
        const landFeil = formData.land && formData.land.feil;
        const fomFeil = formData.fom && formData.fom.feil;
        const tomFeil = formData.tom && formData.tom.feil;
        return landFeil || fomFeil || tomFeil;
    }

    onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        event.stopPropagation();

        if (this.state.formData && !this.formStateHasErrors()) {
            const validPeriode = getValidPeriode(this.state.formData);
            if (validPeriode) {
                this.props.onSubmit(validPeriode);
            }
        }

        this.updateFormState({
            formData: this.state.formData,
            hasSubmitted: true
        });
    }

    updateFormState({ formData, hasSubmitted }: State) {
        const { validateLand, validateFom, validateTom, utenlandsopphold } = this.props;

        const land = formData.land && formData.land.value;
        const fom = formData.fom && formData.fom.value;
        const tom = formData.tom && formData.tom.value;

        const landFeil = validateLand && validateLand({ land: formData.land && formData.land.value });
        const fomFeil = validateFom && validateFom({ fom, tom, utenlandsoppholdInEditMode: utenlandsopphold });
        const tomFeil = validateTom && validateTom({ tom, fom, utenlandsoppholdInEditMode: utenlandsopphold });

        this.setState({
            formData: {
                land: {
                    value: land,
                    feil: landFeil,
                    visFeil: landFeil && (hasSubmitted || this.state.hasSubmitted)
                },
                fom: {
                    value: fom,
                    feil: fomFeil,
                    visFeil: fomFeil && (hasSubmitted || this.state.hasSubmitted)
                },
                tom: {
                    value: tom,
                    feil: tomFeil,
                    visFeil: tomFeil && (hasSubmitted || this.state.hasSubmitted)
                }
            },
            hasSubmitted: hasSubmitted || this.state.hasSubmitted
        });
    }

    render() {
        const { language, tidsperiode, alleUtenlandsopphold, utenlandsopphold } = this.props;
        const { formData, erEndring } = this.state;

        const fomDato = getDateFromString(formData && formData.fom && formData.fom.value);
        const tomDato = getDateFromString(formData && formData.tom && formData.tom.value);

        const lagreKnappTekstId = erEndring ? 'medlemmskap.modal.lagreEndringer' : 'medlemmskap.knapp.leggTilLand';

        const fomMinDato = tidsperiode ? tidsperiode.startdato : undefined;
        const fomMaksDato = tomDato || (tidsperiode ? tidsperiode.sluttdato : undefined);
        const tomMinDato = fomDato || (tidsperiode ? tidsperiode.startdato : undefined);
        const tomMaksDato = tidsperiode ? tidsperiode.sluttdato : undefined;

        let fomAvgrensning: Avgrensninger = {};
        let tomAvgrensning: Avgrensninger = {};
        const registrertePerioder = alleUtenlandsopphold
            ? getRegistrertePerioder(alleUtenlandsopphold, utenlandsopphold)
            : undefined;
        if (fomMinDato || fomMaksDato) {
            fomAvgrensning = {
                minDato: fomMinDato,
                maksDato: fomMaksDato,
                ugyldigeTidsperioder: registrertePerioder
            };
        }
        if (tomMinDato || tomMaksDato) {
            tomAvgrensning = {
                minDato: tomMinDato,
                maksDato: tomMaksDato,
                ugyldigeTidsperioder: registrertePerioder
            };
        }

        let landFeil;
        let fomFeil;
        let tomFeil;

        if (formData && formData.land && formData.land.visFeil === true) {
            landFeil = formData.land.feil;
        }
        if (formData && formData.fom && formData.fom.visFeil === true) {
            fomFeil = formData.fom.feil;
        }
        if (formData && formData.tom && formData.tom.visFeil === true) {
            tomFeil = formData.tom.feil;
        }

        return (
            <Modal
                className="countryModal"
                isOpen={true}
                contentLabel="landvelger"
                closeButton={true}
                onRequestClose={() => {
                    this.props.closeModal();
                }}>
                <form onSubmit={this.onSubmit}>
                    <Undertittel className="countryModal__title">
                        <FormattedMessage id="medlemmskap.modal.overskrift" />
                    </Undertittel>
                    <FormBlock margin="xs">
                        <CountrySelect
                            label={<LabelText>{this.props.label}</LabelText>}
                            feil={landFeil}
                            onChange={(land) =>
                                this.updateFormState({
                                    formData: { ...formData, land: { value: land } }
                                })
                            }
                            language={language}
                            defaultValue={formData && formData.land && formData.land.value}
                        />
                    </FormBlock>
                    <FormBlock margin="xs">
                        <DateInput
                            id="boddFraDato"
                            label={<LabelText intlId="standard.text.fra" />}
                            dato={fomDato}
                            feil={fomFeil}
                            onChange={(dato) =>
                                this.updateFormState({
                                    formData: {
                                        ...formData,
                                        fom: { value: dato ? dato.toISOString() : undefined }
                                    }
                                })
                            }
                            avgrensninger={fomAvgrensning}
                            kalenderplassering="fullskjerm"
                        />
                    </FormBlock>
                    <FormBlock margin="m">
                        <DateInput
                            id="boddTilDato"
                            label={<LabelText intlId="standard.text.til" />}
                            dato={tomDato}
                            feil={tomFeil}
                            onChange={(dato) =>
                                this.updateFormState({
                                    formData: {
                                        ...formData,
                                        tom: { value: dato ? dato.toISOString() : undefined }
                                    }
                                })
                            }
                            avgrensninger={tomAvgrensning}
                            kalenderplassering="fullskjerm"
                        />
                    </FormBlock>
                    <FormBlock margin="xxs">
                        <div className="countryModal__buttonBar">
                            <Knapp onClick={() => this.props.closeModal()} htmlType="button">
                                <FormattedMessage id="medlemmskap.modal.avbryt" />
                            </Knapp>
                            <Hovedknapp>
                                <FormattedMessage id={lagreKnappTekstId} />
                            </Hovedknapp>
                        </div>
                    </FormBlock>
                </form>
            </Modal>
        );
    }
}
export default injectIntl(CountryModal);
