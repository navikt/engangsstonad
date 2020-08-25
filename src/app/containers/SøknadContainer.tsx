import * as React from 'react';
import { RouteComponentProps, Prompt } from 'react-router';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import getMessage from 'common/util/i18nUtils';
import getStepConfig from '../connected-components/engangsstonad-steg/steg.config';
import { apiActionCreators as api, stepActionCreators as stepActions } from 'actions';
import Søknadstittel from 'components/søknadstittel/Søknadstittel';
import SkjemaHeader from 'components/skjema-header/SkjemaHeader';
import Person from 'app/types/domain/Person';
import CancelButton from 'components/cancel-button/CancelButton';
import EngangsstonadSoknad from '../types/domain/EngangsstonadSoknad';
import { DispatchProps } from 'common/redux/types';
import UtløptSesjonModal from 'components/utløpt-sesjon-modal/UtløptSesjonModal';
const { ValidForm } = require('./../lib') as any;
import { AppState } from 'reducers/reducers';
import { Language } from 'intl/IntlProvider';

import '../styles/engangsstonad.less';

interface OwnProps {
    søknad: EngangsstonadSoknad;
    language: Language;
    person: Person;
    activeStep: number;
    søknadSendt: boolean;
    søknadSendingInProgress: boolean;
    sessionHasExpired: boolean;
}

type Props = OwnProps & DispatchProps & InjectedIntlProps & RouteComponentProps;

class SøknadContainer extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleNextClicked = this.handleNextClicked.bind(this);
        this.handleBackClicked = this.handleBackClicked.bind(this);
    }

    hasToWaitForResponse() {
        const { activeStep, intl, person } = this.props;
        const stepsConfig = getStepConfig(intl, person);
        return activeStep === stepsConfig.length;
    }

    handleNextClicked() {
        const { dispatch, søknad, language } = this.props;
        if (this.hasToWaitForResponse()) {
            return dispatch(api.sendSoknad(søknad, language));
        }
        const { activeStep } = this.props;
        dispatch(stepActions.setActiveStep(activeStep + 1));
    }

    handleBackClicked() {
        const { dispatch, activeStep } = this.props;
        if (activeStep > 1) {
            dispatch(stepActions.setActiveStep(activeStep - 1));
        }
    }

    shouldRenderFortsettKnapp(): boolean {
        const { activeStep, person, intl, søknad } = this.props;
        const stepConfig = getStepConfig(intl, person);
        return stepConfig[activeStep - 1].nextStepCondition({ ...søknad });
    }

    render() {
        const { intl, activeStep, søknadSendingInProgress, person, sessionHasExpired } = this.props;
        const stepsConfig = getStepConfig(intl, person);
        const titles = stepsConfig.map((stepConf) => stepConf.stegIndikatorLabel);
        const fortsettKnappLabel = stepsConfig[activeStep - 1].fortsettKnappLabel;

        const ActiveStep = stepsConfig[activeStep - 1].component;

        return (
            <>
                <Prompt message={() => getMessage(intl, 'søknadContainer.prompt')} />
                <Søknadstittel tittel={getMessage(intl, 'søknad.pageheading')} />
                <ValidForm
                    summaryTitle={getMessage(intl, 'validForm.summaryTitle')}
                    noSummary={activeStep === stepsConfig.length - 1}
                    onSubmit={this.handleNextClicked}
                    className="responsiveContainer"
                >
                    <SkjemaHeader
                        onPrevious={() => this.handleBackClicked()}
                        activeStep={activeStep}
                        stepTitles={titles}
                    />

                    <ActiveStep />

                    {this.shouldRenderFortsettKnapp() && (
                        <Hovedknapp
                            className="responsiveButton"
                            disabled={søknadSendingInProgress}
                            spinner={søknadSendingInProgress}
                        >
                            {fortsettKnappLabel}
                        </Hovedknapp>
                    )}
                    <CancelButton />
                </ValidForm>
                <UtløptSesjonModal erÅpen={sessionHasExpired} />
            </>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    søknad: state.soknadReducer,
    language: state.commonReducer.language,
    person: state.apiReducer.person!,
    activeStep: state.stepReducer.activeStep,
    søknadSendt: state.apiReducer.søknadSendt,
    søknadSendingInProgress: state.apiReducer.søknadSendingInProgress,
    sessionHasExpired: state.apiReducer.sessionHasExpired,
});
export default connect<OwnProps>(mapStateToProps)(injectIntl(SøknadContainer));
