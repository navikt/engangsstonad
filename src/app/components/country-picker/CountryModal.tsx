import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { Utenlandsopphold } from '../../types/domain/InformasjonOmUtenlandsopphold';
import CountrySelect from 'components/country-select/CountrySelect';
import DateInput from 'components/date-input/DateInput';
import { Tidsperiode, Avgrensninger } from 'nav-datovelger';
import LabelText from 'common/components/labeltekst/Labeltekst';
import FormBlock from 'components/form-block/FormBlock';
import { Feil } from 'components/skjema-input-element/types';
import { Språkkode } from 'intl/types';

const Modal = require('nav-frontend-modal').default;

interface Props {
    språkkode: Språkkode;
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

interface Field {
    value: any;
    feil?: Feil;
    visFeil?: boolean;
}

interface PeriodeForm {
    fom?: Field;
    tom?: Field;
    land?: Field;
}

interface State {
    erEndring: boolean;
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
                tom: tom.value,
            },
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
        sluttdato: new Date(opphold.tidsperiode.tom),
    }));
};

const getDefaultState = (utenlandsopphold?: Utenlandsopphold): State => {
    if (utenlandsopphold) {
        return {
            erEndring: true,
            formData: {
                land: {
                    value: utenlandsopphold.land,
                },
                fom: {
                    value: utenlandsopphold.tidsperiode.fom,
                },
                tom: {
                    value: utenlandsopphold.tidsperiode.tom,
                },
            },
        };
    }
    return {
        erEndring: false,
        hasSubmitted: false,
        formData: {},
    };
};

const CountryModal: React.FunctionComponent<Props> = ({
    validateLand,
    validateFom,
    validateTom,
    closeModal,
    onSubmit,
    label,
    utenlandsopphold,
    språkkode,
    tidsperiode,
    alleUtenlandsopphold,
}) => {
    const erEndring = getDefaultState(utenlandsopphold).erEndring;
    const [formData, setFormData] = useState<PeriodeForm>(getDefaultState(utenlandsopphold).formData);
    const [hasSubmitted, setHasSubmitted] = useState<boolean | undefined>(
        getDefaultState(utenlandsopphold).hasSubmitted
    );
    const formStateHasErrors = () => {
        const formDataLandFeil = formData.land && formData.land.feil;
        const fromDataFomFeil = formData.fom && formData.fom.feil;
        const fromDataTomFeil = formData.tom && formData.tom.feil;
        return formDataLandFeil || fromDataFomFeil || fromDataTomFeil;
    };
    const handleOnSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (formData && !formStateHasErrors()) {
            const validPeriode = getValidPeriode(formData);
            if (validPeriode) {
                onSubmit(validPeriode);
            }
        }
        setFormData(formData);
        setHasSubmitted(true);
    };
    const updateFormState = (PeriodeFormData: PeriodeForm) => {
        const land = PeriodeFormData.land && PeriodeFormData.land.value;
        const fom = PeriodeFormData.fom && PeriodeFormData.fom.value;
        const tom = PeriodeFormData.tom && PeriodeFormData.tom.value;
        const validatedLandFeil = validateLand && validateLand({ land: PeriodeFormData.land && PeriodeFormData.land.value });
        const validatedFomFeil = validateFom && validateFom({ fom, tom, utenlandsoppholdInEditMode: utenlandsopphold });
        const validatedtomFeil = validateTom && validateTom({ tom, fom, utenlandsoppholdInEditMode: utenlandsopphold });
        setFormData({
            land: {
                value: land,
                feil: validatedLandFeil,
                visFeil: validatedLandFeil && hasSubmitted,
            },
            fom: {
                value: fom,
                feil: validatedFomFeil,
                visFeil: validatedFomFeil && hasSubmitted,
            },
            tom: {
                value: tom,
                feil: validatedtomFeil,
                visFeil: validatedtomFeil && hasSubmitted,
            },
        });
    };
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
            ugyldigeTidsperioder: registrertePerioder,
        };
    }
    if (tomMinDato || tomMaksDato) {
        tomAvgrensning = {
            minDato: tomMinDato,
            maksDato: tomMaksDato,
            ugyldigeTidsperioder: registrertePerioder,
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
                closeModal();
            }}
        >
            <form onSubmit={handleOnSubmit}>
                <Undertittel className="countryModal__title">
                    <FormattedMessage id="medlemmskap.modal.overskrift" />
                </Undertittel>
                <FormBlock margin="xs">
                    <CountrySelect
                        label={<LabelText>{label}</LabelText>}
                        feil={landFeil}
                        onChange={(land) => updateFormState({ ...formData, land: { value: land } })}
                        språkkode={språkkode}
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
                            updateFormState({
                                ...formData,
                                fom: { value: dato ? dato.toISOString() : undefined },
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
                            updateFormState({
                                ...formData,
                                tom: { value: dato ? dato.toISOString() : undefined },
                            })
                        }
                        avgrensninger={tomAvgrensning}
                        kalenderplassering="fullskjerm"
                    />
                </FormBlock>
                <FormBlock margin="xxs">
                    <div className="countryModal__buttonBar">
                        <Knapp onClick={() => closeModal()} htmlType="button">
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
};
export default CountryModal;
