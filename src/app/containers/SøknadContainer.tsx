import * as React from 'react';
import { RouteComponentProps, Prompt } from 'react-router';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';

import getMessage from '../util/i18n/i18nUtils';

import getStepConfig from './../connected-components/engangsstonad-steg/steg.config';

import '../styles/engangsstonad.less';
import Utenlandsopphold from '../types/domain/Utenlandsopphold';
import { FodtBarn, UfodtBarn } from '../types/domain/Barn';
import AnnenForelder from '../types/domain/AnnenForelder';
import { apiActionCreators as api, stepActionCreators as stepActions } from 'actions';
import { DispatchProps } from '../redux/types';
import Søknadstittel from 'components/søknadstittel/Søknadstittel';
import SkjemaHeader from 'components/skjema-header/SkjemaHeader';
import Person from 'app/types/domain/Person';
const { ValidForm } = require('./../lib') as any;

interface OwnProps {
    person: Person;
    annenForelder: AnnenForelder;
    utenlandsopphold: Utenlandsopphold;
    barn: FodtBarn & UfodtBarn;
    vedlegg: File[];
    activeStep: number;
    error: any;
    søknadSendt: boolean;
    søknadSendingInProgress: boolean;
}

type Props = OwnProps & DispatchProps & InjectedIntlProps & RouteComponentProps<{}>;

export class SøknadContainer extends React.Component<Props> {
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
        const { dispatch, annenForelder, barn, utenlandsopphold, vedlegg } = this.props;
        if (this.hasToWaitForResponse()) {
            return dispatch(
                api.sendSoknad({
                    annenForelder,
                    barn,
                    utenlandsopphold,
                    vedlegg
                })
            );
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
        const { activeStep, annenForelder, utenlandsopphold, barn, person, vedlegg, intl } = this.props;
        return getStepConfig(intl, person)[activeStep - 1].nextStepCondition({ barn, annenForelder, utenlandsopphold, vedlegg });
    }

    render() {
        const { intl, activeStep, søknadSendingInProgress, person } = this.props;
        const stepsConfig = getStepConfig(intl, person);
        const titles = stepsConfig.map((stepConf: any) => stepConf.stegIndikatorLabel);
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

                    {this.shouldRenderFortsettKnapp() === true && (
                        <Hovedknapp className="responsiveButton" disabled={søknadSendingInProgress} spinner={søknadSendingInProgress}>
                            {fortsettKnappLabel}
                        </Hovedknapp>
                    )}
                </ValidForm>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    person: state.apiReducer.person,
    utenlandsopphold: state.soknadReducer.utenlandsopphold,
    barn: state.soknadReducer.barn,
    vedlegg: state.soknadReducer.vedlegg,
    annenForelder: state.soknadReducer.annenForelder,
    activeStep: state.stepReducer.activeStep,
    error: state.apiReducer.error,
    søknadSendt: state.apiReducer.søknadSendt,
    søknadSendingInProgress: state.apiReducer.søknadSendingInProgress
});
export default connect<OwnProps>(mapStateToProps)(injectIntl(SøknadContainer));
