import * as React from 'react';
import { Prompt } from 'react-router';
import { useIntl } from 'react-intl';
import DocumentTitle from 'react-document-title';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Formik, Form, FormikProps, FormikHelpers } from 'formik';
import _ from 'lodash';

import { FormProps } from 'app/engangsstonad/FormProps';
import { StepConfig } from 'app/types/StepConfig';

import getMessage from 'common/util/i18nUtils';
import Søknadstittel from 'components/søknadstittel/Søknadstittel';
import SkjemaHeader from 'components/skjema-header/SkjemaHeader';
import CancelButton from 'components/cancel-button/CancelButton';
import UtløptSesjonModal from 'components/utløpt-sesjon-modal/UtløptSesjonModal';
import ValidationErrorSummaryBase, {
    ValidationSummaryError,
} from 'components/validation-error-summary/ValidationErrorSummaryBase';
import { Language } from 'intl/IntlProvider';
import VisibilityContextProvider from '../visibility-context/VisibilityContext';

import './skjema.less';

interface Props {
    language: Language;
    søknadSendingInProgress: boolean;
    sessionHasExpired: boolean;
    stegConfig: StepConfig[];
    sendSøknad: (values: Partial<FormProps>) => void;
}

const Skjema: React.FunctionComponent<Props> = ({
    søknadSendingInProgress,
    sessionHasExpired,
    language,
    stegConfig,
    sendSøknad,
}) => {
    const intl = useIntl();
    const [activeStepIndex, setActiveStepIndex] = React.useState(0);
    const ActiveStep = stegConfig[activeStepIndex];

    const onSubmit = (values: Partial<FormProps>, formikHelpers: FormikHelpers<Partial<FormProps>>) => {
        formikHelpers.setStatus({ hasSubmitted: false });
        activeStepIndex === stegConfig.length - 1 ? sendSøknad(values) : setActiveStepIndex(activeStepIndex + 1);
    };

    const handleBackClicked = (formikProps: FormikProps<Partial<FormProps>>) => {
        if (activeStepIndex > 0) {
            formikProps.setStatus({ hasSubmitted: false });
            formikProps.setErrors({});
            setActiveStepIndex(activeStepIndex - 1);
        }
    };

    const getErrorMessages = (formikProps: FormikProps<Partial<FormProps>>): ValidationSummaryError[] => {
        return Object.entries(formikProps.errors).map((error) => ({
            name: error[0],
            message: error[1] as string,
        }));
    };

    const shouldRenderSubmitButton = ({ values }: FormikProps<Partial<FormProps>>): boolean => {
        try {
            if (ActiveStep.validationSchema) {
                ActiveStep.validationSchema(intl).validateSync(values, { abortEarly: false });
            }
            return true;
        } catch (error) {
            return !error.inner.some((err: any) => err.type === 'required' || err.type === 'min');
        }
    };

    return (
        <>
            <Søknadstittel tittel={getMessage(intl, 'søknad.pageheading')} />
            <DocumentTitle
                title={getMessage(intl, 'dokument.tittel.steg', {
                    steg: getMessage(intl, stegConfig[activeStepIndex].stegIndikatorLabel),
                })}
            />
            <VisibilityContextProvider>
                <Formik
                    initialValues={{
                        terminberkreftelse: [],
                        oppholdNeste12Mnd: [],
                        oppholdSiste12Mnd: [],
                    }}
                    validateOnMount={true}
                    initialStatus={{}}
                    validationSchema={ActiveStep.validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formikProps: FormikProps<Partial<FormProps>>) => {
                        return (
                            <div className="responsiveContainer">
                                <SkjemaHeader
                                    onPrevious={() => handleBackClicked(formikProps)}
                                    activeStep={activeStepIndex + 1}
                                    stepTitles={stegConfig.map((stepConf) => stepConf.stegIndikatorLabel)}
                                />

                                <Form>
                                    {formikProps.status?.hasSubmitted && !_.isEmpty(formikProps.errors) && (
                                        <ValidationErrorSummaryBase
                                            title={getMessage(intl, 'title')}
                                            errors={getErrorMessages(formikProps)}
                                        />
                                    )}

                                    {ActiveStep.component({ formikProps, intl, language })}

                                    {shouldRenderSubmitButton(formikProps) && (
                                        <Hovedknapp
                                            className="responsiveButton"
                                            disabled={søknadSendingInProgress}
                                            spinner={søknadSendingInProgress}
                                            onClick={() => formikProps.setStatus({ hasSubmitted: true })}
                                        >
                                            {ActiveStep.fortsettKnappLabel}
                                        </Hovedknapp>
                                    )}

                                    <CancelButton />
                                </Form>
                            </div>
                        );
                    }}
                </Formik>
            </VisibilityContextProvider>
            <Prompt message={getMessage(intl, 'søknadContainer.prompt')} />
            <UtløptSesjonModal erÅpen={sessionHasExpired} />
        </>
    );
};
export default Skjema;
