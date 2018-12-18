import * as React from 'react';
import { RouteComponentProps, Prompt } from 'react-router';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';

import getMessage from '../util/i18n/i18nUtils';

import getStepConfig from './../connected-components/engangsstonad-steg/steg.config';

import '../styles/engangsstonad.less';
import { apiActionCreators as api, stepActionCreators as stepActions } from 'actions';
import Søknadstittel from 'components/søknadstittel/Søknadstittel';
import SkjemaHeader from 'components/skjema-header/SkjemaHeader';
import Person from 'app/types/domain/Person';
import CancelButton from 'components/cancel-button/CancelButton';
import EngangsstonadSoknad from '../types/domain/EngangsstonadSoknad';
import { CommonState } from 'reducers/commonReducer';
import { DispatchProps } from 'common/redux/types';
import { storageFeatureIsActive } from 'util/featureToggles';
import { Attachment } from 'common/storage/attachment/types/Attachment';
const { ValidForm } = require('./../lib') as any;

interface OwnProps {
    søknad: EngangsstonadSoknad;
    step: { activeStep: number };
    common: CommonState;
    person: Person;
    activeStep: number;
    error: any;
    søknadSendt: boolean;
    søknadSendingInProgress: boolean;
    vedlegg: Attachment[];
}

type Props = OwnProps & DispatchProps & InjectedIntlProps & RouteComponentProps<{}>;

class SøknadContainer extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleNextClicked = this.handleNextClicked.bind(this);
        this.handleBackClicked = this.handleBackClicked.bind(this);
    }

    componentWillReceiveProps(props: OwnProps) {
        const { history } = this.props;
        const { error, søknadSendt } = props;
        if (søknadSendt === true) {
            if (!error) {
                history.push('/engangsstonad');
            } else if (error.status >= 400 && error.status !== 401) {
                history.push('/engangsstonad/innsendingsfeil');
            }
        }
    }

    hasToWaitForResponse() {
        const { activeStep, intl, person } = this.props;
        const stepsConfig = getStepConfig(intl, person);
        return activeStep === stepsConfig.length;
    }

    handleNextClicked() {
        const { dispatch, søknad, common, step } = this.props;
        if (this.hasToWaitForResponse()) {
            return dispatch(
                api.sendSoknad(søknad),
            );
        }
        const { activeStep } = this.props;
        dispatch(stepActions.setActiveStep(activeStep + 1));

        if (storageFeatureIsActive()) {
            dispatch(api.saveAppState({
                søknad, common, step
            }));
        }
    }

    handleBackClicked() {
        const { dispatch, activeStep } = this.props;
        if (activeStep > 1) {
            dispatch(stepActions.setActiveStep(activeStep - 1));
        }
    }

    shouldRenderFortsettKnapp(): boolean {
        const { activeStep, person, intl, søknad, vedlegg } = this.props;
        const stepConfig = getStepConfig(intl, person);
        return stepConfig[activeStep - 1].nextStepCondition({ ...søknad, vedlegg });
    }

    render() {
        const { intl, activeStep, søknadSendingInProgress, person } = this.props;
        const stepsConfig = getStepConfig(intl, person);
        const titles = stepsConfig.map((stepConf) => stepConf.stegIndikatorLabel);
        const fortsettKnappLabel = stepsConfig[activeStep - 1].fortsettKnappLabel;

        const ActiveStep = stepsConfig[activeStep - 1].component;
        return (
            <div>
                <Prompt
                    message={nextLocation => {
                        const { location } = this.props;
                        if (location.pathname === nextLocation.pathname && nextLocation.hash !== location.hash) {
                            return true;
                        }
                        return 'Hvis du går ut av siden vil du miste all informasjonen som du har fylt ut i søknaden. Ønsker du å fortsette?';
                    }}
                />
                <Søknadstittel tittel={getMessage(intl, 'søknad.pageheading')} />
                <ValidForm
                    summaryTitle="Du må rette opp i følgende feil:"
                    noSummary={activeStep === stepsConfig.length - 1}
                    onSubmit={this.handleNextClicked}
                    className="responsiveContainer"
                >
                    <SkjemaHeader onPrevious={() => this.handleBackClicked()} activeStep={activeStep} stepTitles={titles} />

                    <ActiveStep />

                    {this.shouldRenderFortsettKnapp() && (
                        <Hovedknapp className="responsiveButton" disabled={søknadSendingInProgress} spinner={søknadSendingInProgress}>
                            {fortsettKnappLabel}
                        </Hovedknapp>
                    )}
                    <CancelButton redirect="https://tjenester.nav.no/dittnav/oversikt" />
                </ValidForm>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    søknad: state.soknadReducer,
    step: state.stepReducer,
    common: state.commonReducer,
    person: state.apiReducer.person,
    activeStep: state.stepReducer.activeStep,
    error: state.apiReducer.error,
    søknadSendt: state.apiReducer.søknadSendt,
    søknadSendingInProgress: state.apiReducer.søknadSendingInProgress,
    vedlegg: state.attachmentReducer
});
export default connect<OwnProps>(mapStateToProps)(injectIntl(SøknadContainer));
