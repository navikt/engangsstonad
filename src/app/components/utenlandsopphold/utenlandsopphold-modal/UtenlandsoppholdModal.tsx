import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { Formik, Form } from 'formik';
import Modal from 'nav-frontend-modal';

import { getForignCountries } from '../../../connected-components/engangsstonad-steg/steg-2/Steg2';
import FormBlock from 'components/form-block/FormBlock';
import DatovelgerElement from 'components/form/date-input/DateInput';
import Select from 'components/form/select/Select';
import { Language } from 'intl/IntlProvider';

import { Utenlandsopphold, Tidsperiode } from '../../../types/domain/InformasjonOmUtenlandsopphold';

import validationSchema from './validationSchema';
import { Questions } from './questions';

interface Props {
    language: Language;
    gyldigTidsperiode?: Tidsperiode;
    utenlandsopphold?: Utenlandsopphold;
    alleUtenlandsopphold?: Utenlandsopphold[];
    onSubmit: (periode: Utenlandsopphold) => void;
    closeModal: () => void;
}

interface FormValues {
    land: string;
    fom: string;
    tom: string;
}

const CountryModal: React.FunctionComponent<Props> = ({
    utenlandsopphold,
    gyldigTidsperiode,
    alleUtenlandsopphold = [],
    onSubmit,
    closeModal,
    language
}) => {
    const initialValues = () => {
        return utenlandsopphold
            ? {
                  land: utenlandsopphold.land,
                  fom: utenlandsopphold.tidsperiode.fom,
                  tom: utenlandsopphold.tidsperiode.tom
              }
            : {};
    };

    const handleOnSubmit = (values: FormValues) => {
        onSubmit({
            land: values[Questions.land],
            tidsperiode: {
                fom: values[Questions.fom],
                tom: values[Questions.tom]
            }
        });
        closeModal();
    };

    const datoavelgerAvgrensninger = {
        minDato: gyldigTidsperiode?.fom,
        maksDato: gyldigTidsperiode?.tom,
        ugyldigeTidsperioder: alleUtenlandsopphold.map((u) => u.tidsperiode)
    };

    return (
        <Modal
            className="countryModal"
            isOpen={true}
            contentLabel="landvelger"
            closeButton={true}
            onRequestClose={closeModal}
        >
            <Formik
                initialValues={initialValues()}
                validationSchema={validationSchema(gyldigTidsperiode, datoavelgerAvgrensninger.ugyldigeTidsperioder)}
                onSubmit={handleOnSubmit}
                render={() => {
                    return (
                        <Form>
                            <Undertittel className="countryModal__title">
                                <FormattedMessage id="medlemmskap.modal.overskrift" />
                            </Undertittel>
                            <Select name={Questions.land} options={getForignCountries(language)} />
                            <DatovelgerElement name={Questions.fom} avgrensninger={datoavelgerAvgrensninger} />
                            <DatovelgerElement name={Questions.tom} avgrensninger={datoavelgerAvgrensninger} />
                            <FormBlock margin="xxs">
                                <div className="countryModal__buttonBar">
                                    <Knapp onClick={() => closeModal()} htmlType="button">
                                        <FormattedMessage id="avbryt" />
                                    </Knapp>
                                    <Hovedknapp>
                                        <FormattedMessage id="lagre" />
                                    </Hovedknapp>
                                </div>
                            </FormBlock>
                        </Form>
                    );
                }}
            />
        </Modal>
    );
};
export default CountryModal;
