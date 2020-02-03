import * as React from 'react';
import { Prompt, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Formik, Form, FormikProps } from 'formik';
import _ from 'lodash';

import { sendSoknad } from 'actions/api/apiActionCreators';
import Person from 'app/types/domain/Person';
import { FormProps } from 'app/connected-components/engangsstonad-steg/FormProps';

import Søknadstittel from 'components/søknadstittel/Søknadstittel';
import SkjemaHeader from 'components/skjema-header/SkjemaHeader';
import CancelButton from 'components/cancel-button/CancelButton';
import UtløptSesjonModal from 'components/utløpt-sesjon-modal/UtløptSesjonModal';
import ValidationErrorSummaryBase, {
    ValidationSummaryError
} from 'components/validation-error-summary/ValidationErrorSummaryBase';

import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';

import { Language } from 'intl/IntlProvider';
import { mapFormStateToEngangsstonadDto } from 'util/formStateToEngangsttonadDtoMapper';
import { AppState } from 'reducers/reducers';

import getStepConfig from '../connected-components/engangsstonad-steg/steg.config';


import './søknadContainer.less';

interface OwnProps {
    language: Language;
    person: Person;
    søknadSendingInProgress: boolean;
    sessionHasExpired: boolean;
}

type Props = OwnProps & DispatchProps & InjectedIntlProps & RouteComponentProps;

const SøknadContainer: React.FunctionComponent<Props> = ({
    person,
    søknadSendingInProgress,
    sessionHasExpired,
    language,
    dispatch,
    intl
}) => {
    const [activeStepIndex, setActiveStepIndex] = React.useState(0);
    const [liveValidation, setLiveValidation] = React.useState(false);

    const stepsConfig = getStepConfig(intl, person);
    const ActiveStep = stepsConfig[activeStepIndex];

    const onSubmit = (values: Partial<FormProps>) => {
        setLiveValidation(false);
        activeStepIndex === stepsConfig.length - 1
            ? dispatch(sendSoknad(mapFormStateToEngangsstonadDto(values, language)))
            : setActiveStepIndex(activeStepIndex + 1);
    };

    const handleBackClicked = (formikProps: FormikProps<Partial<FormProps>>) => {
        if (activeStepIndex > 0) {
            formikProps.setErrors({});
            setActiveStepIndex(activeStepIndex - 1);
        }
    };

    const getErrorMessages = (formikProps: FormikProps<Partial<FormProps>>): ValidationSummaryError[] => {
        return Object.entries(formikProps.errors).map((error) => ({
            name: error[0],
            message: error[1] as string
        }));
    };

    const shouldRenderSubmitButton = ({ values }: FormikProps<Partial<FormProps>>): boolean => {
        try {
            ActiveStep.validationSchema().validateSync(values);
            return true;
        } catch (error) {
            return error.type !== 'required';
        }
    };

    return (
        <>
            <Søknadstittel tittel={getMessage(intl, 'søknad.pageheading')} />
            <Formik
                initialValues={{
                    terminberkreftelse: [],
                    oppholdNeste12Mnd: [],
                    oppholdSiste12Mnd: []
                }}
                validationSchema={ActiveStep.validationSchema}
                onSubmit={onSubmit}
                render={(formikProps: FormikProps<Partial<FormProps>>) => (
                    <div className="responsiveContainer">
                        <SkjemaHeader
                            onPrevious={() => handleBackClicked(formikProps)}
                            activeStep={activeStepIndex + 1}
                            stepTitles={stepsConfig.map((stepConf) => stepConf.stegIndikatorLabel)}
                        />

                        <Form>
                            {liveValidation && !_.isEmpty(formikProps.errors) && (
                                <ValidationErrorSummaryBase
                                    title={getMessage(intl, 'title')}
                                    errors={getErrorMessages(formikProps)}
                                />
                            )}

                            {ActiveStep.component(formikProps)}

                            {shouldRenderSubmitButton(formikProps) && (
                                <Hovedknapp
                                    className="responsiveButton"
                                    disabled={søknadSendingInProgress}
                                    spinner={søknadSendingInProgress}
                                    onClick={() => setLiveValidation(true)}
                                >
                                    {ActiveStep.fortsettKnappLabel}
                                </Hovedknapp>
                            )}

                            <CancelButton />
                        </Form>
                    </div>
                )}
            />
            <Prompt message={getMessage(intl, 'søknadContainer.prompt')} />
            <UtløptSesjonModal erÅpen={sessionHasExpired} />
        </>
    );
};

const mapStateToProps = (state: AppState) => ({
    language: state.commonReducer.language,
    person: state.apiReducer.person!,
    søknadSendingInProgress: state.apiReducer.søknadSendingInProgress,
    sessionHasExpired: state.apiReducer.sessionHasExpired
});
export default connect<OwnProps>(mapStateToProps)(injectIntl(SøknadContainer));
