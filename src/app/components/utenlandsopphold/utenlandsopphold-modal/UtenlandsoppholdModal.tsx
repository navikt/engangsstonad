import * as React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { Formik, Form } from 'formik';

import { getForignCountries } from '../../../connected-components/engangsstonad-steg/steg-2/Steg2';
import FormBlock from 'components/form-block/FormBlock';
import DatovelgerElement from 'components/form/date-input/DateInput';
import Select from 'components/form/select/Select';
import { Language } from 'intl/IntlProvider';

import { Utenlandsopphold } from '../../../types/domain/InformasjonOmUtenlandsopphold';

import validationSchema from './validationSchema';
import { Questions } from './questions';

import Modal from 'nav-frontend-modal';

interface Props {
    language: Language;
    utenlandsopphold?: Utenlandsopphold;
    alleUtenlandsopphold?: Utenlandsopphold[];
    label: string;
    onSubmit: (periode: Utenlandsopphold) => void;
    closeModal: () => void;
}

interface FormValues {
    land: string;
    fom: string;
    tom: string;
}

const CountryModal: React.FunctionComponent<Props> = ({ utenlandsopphold, onSubmit, closeModal, language }) => {
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
                validationSchema={() => validationSchema()}
                onSubmit={handleOnSubmit}
                render={(form) => {
                    console.log(form);
                    return (
                        <Form>
                            <Undertittel className="countryModal__title">
                                <FormattedMessage id="medlemmskap.modal.overskrift" />
                            </Undertittel>
                            <Select name={Questions.land} options={getForignCountries(language)} />
                            <DatovelgerElement name={Questions.fom} />
                            <DatovelgerElement name={Questions.tom} />
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
export default injectIntl(CountryModal);
