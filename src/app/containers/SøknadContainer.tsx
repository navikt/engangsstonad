import * as React from 'react';
import { Prompt, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Formik, Form, FormikProps } from 'formik';
import _ from 'lodash';

import getMessage from 'common/util/i18nUtils';
import getStepConfig from '../connected-components/engangsstonad-steg/steg.config';
import Søknadstittel from 'components/søknadstittel/Søknadstittel';
import SkjemaHeader from 'components/skjema-header/SkjemaHeader';
import Person from 'app/types/domain/Person';
import CancelButton from 'components/cancel-button/CancelButton';
import { DispatchProps } from 'common/redux/types';
import UtløptSesjonModal from 'components/utløpt-sesjon-modal/UtløptSesjonModal';
import { Language } from 'intl/IntlProvider';
import ValidationErrorSummaryBase, {
    ValidationSummaryError
} from 'components/validation-error-summary/ValidationErrorSummaryBase';
import { FormProps } from 'app/connected-components/engangsstonad-steg/FormProps';
import { sendSoknad } from 'actions/api/apiActionCreators';
import { mapFormStateToEngangsstonadDto } from 'util/formStateToEngangsttonadDtoMapper';
import { AppState } from 'reducers/reducers';

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
                onSubmit={(values) => onSubmit(values)}
                render={(formikProps: FormikProps<Partial<FormProps>>) => {
                    return (
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

                                {!_.some(formikProps.errors, (value) => value === 'Required') && (
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
                    );
                }}
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
