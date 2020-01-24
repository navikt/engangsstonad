import * as React from 'react';
import { RouteComponentProps, Prompt } from 'react-router';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Formik, Form, FormikProps } from 'formik';
import _ from 'lodash';

import getMessage from 'common/util/i18nUtils';
import getStepConfig from '../connected-components/engangsstonad-steg/steg.config';
import { stepActionCreators as stepActions } from 'actions';
import Søknadstittel from 'components/søknadstittel/Søknadstittel';
import SkjemaHeader from 'components/skjema-header/SkjemaHeader';
import Person from 'app/types/domain/Person';
import CancelButton from 'components/cancel-button/CancelButton';
import { DispatchProps } from 'common/redux/types';
import UtløptSesjonModal from 'components/utløpt-sesjon-modal/UtløptSesjonModal';
import { AppState } from 'reducers/reducers';
import { Language } from 'intl/IntlProvider';
import ValidationErrorSummaryBase, {
    ValidationSummaryError
} from 'components/validation-error-summary/ValidationErrorSummaryBase';
import { FormProps } from 'app/connected-components/engangsstonad-steg/FormProps';

interface OwnProps {
    language: Language;
    person: Person;
    activeStep: number;
    søknadSendt: boolean;
    søknadSendingInProgress: boolean;
    sessionHasExpired: boolean;
}

interface State {
    liveValidation: boolean;
}

type Props = OwnProps & DispatchProps & InjectedIntlProps & RouteComponentProps;

class SøknadContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            liveValidation: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleBackClicked = this.handleBackClicked.bind(this);
    }

    hasToWaitForResponse() {
        const { activeStep, intl, person } = this.props;
        const stepsConfig = getStepConfig(intl, person);
        return activeStep === stepsConfig.length;
    }

    onSubmit() {
        this.setState({ liveValidation: false });
        const { dispatch, activeStep } = this.props;
        dispatch(stepActions.setActiveStep(activeStep + 1));
    }

    handleBackClicked() {
        const { dispatch, activeStep } = this.props;
        if (activeStep > 1) {
            dispatch(stepActions.setActiveStep(activeStep - 1));
        }
    }

    getErrorMessages(formikProps: FormikProps<Partial<FormProps>>): ValidationSummaryError[] {
        return Object.entries(formikProps.errors).map(error => ({
            name: error[0],
            message: error[1] as string
        }));
    }

    render() {
        const { intl, activeStep, søknadSendingInProgress, person, sessionHasExpired } = this.props;
        const { liveValidation } = this.state;
        const stepsConfig = getStepConfig(intl, person);
        const titles = stepsConfig.map((stepConf) => stepConf.stegIndikatorLabel);
        const ActiveStep = stepsConfig[activeStep - 1];
        return (
            <>
                <Prompt message={getMessage(intl, 'søknadContainer.prompt')} />
                <Søknadstittel tittel={getMessage(intl, 'søknad.pageheading')} />
                <Formik
                    initialValues={{
                        terminberkreftelse: [],
                        oppholdNeste12Mnd: [],
                        oppholdSiste12Mnd: []
                    }}
                    validationSchema={ActiveStep.validationSchema}
                    onSubmit={() => this.onSubmit()}
                    render={(formikProps: FormikProps<Partial<FormProps>>) => {
                        return (
                            <>
                                <Form className="responsiveContainer">
                                    <SkjemaHeader
                                        onPrevious={() => {
                                            formikProps.setErrors({});
                                            this.handleBackClicked();
                                        }}
                                        activeStep={activeStep}
                                        stepTitles={titles}
                                    />

                                    {liveValidation && !_.isEmpty(formikProps.errors) && (
                                        <ValidationErrorSummaryBase
                                            title={getMessage(intl, 'title')}
                                            errors={this.getErrorMessages(formikProps)}
                                        />
                                    )}

                                    {ActiveStep.component(formikProps)}

                                    {!_.some(formikProps.errors, (value) => value === 'Required') && (
                                        <Hovedknapp
                                            className="responsiveButton"
                                            disabled={søknadSendingInProgress}
                                            spinner={søknadSendingInProgress}
                                            onClick={() => this.setState({ liveValidation: true })}
                                        >
                                            {ActiveStep.fortsettKnappLabel}
                                        </Hovedknapp>
                                    )}
                                    <CancelButton />
                                </Form>
                            </>
                        );
                    }}
                />
                <UtløptSesjonModal erÅpen={sessionHasExpired} />
            </>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    language: state.commonReducer.language,
    person: state.apiReducer.person!,
    activeStep: state.stepReducer.activeStep,
    søknadSendt: state.apiReducer.søknadSendt,
    søknadSendingInProgress: state.apiReducer.søknadSendingInProgress,
    sessionHasExpired: state.apiReducer.sessionHasExpired
});
export default connect<OwnProps>(mapStateToProps)(injectIntl(SøknadContainer));
