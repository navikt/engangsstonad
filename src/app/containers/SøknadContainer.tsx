import * as React from 'react';
import { RouteComponentProps, Prompt } from 'react-router';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';

import getMessage from '../util/i18n/i18nUtils';

import Steg1 from './../connected-components//engangsstonad-steg/Steg1';
import Steg2 from '../connected-components/engangsstonad-steg/Steg2';
import Steg3 from '../connected-components/engangsstonad-steg/Steg3';
import Steg4 from '../connected-components/engangsstonad-steg/Steg4';

import getStepConfig from './../connected-components/engangsstonad-steg/steg.config';

import '../styles/engangsstonad.less';
import Utenlandsopphold from '../types/domain/Utenlandsopphold';
import { FodtBarn, UfodtBarn } from '../types/domain/Barn';
import AnnenForelder from '../types/domain/AnnenForelder';
import {
    apiActionCreators as api,
    stepActionCreators as stepActions
} from 'actions';
import { DispatchProps } from '../redux/types';
import Søknadstittel from 'components/søknadstittel/Søknadstittel';
import SkjemaHeader from 'components/skjema-header/SkjemaHeader';
import {
    shouldDisplayNextButtonOnStep1,
    shouldDisplayNextButtonOnStep2,
    shouldDisplayNextButtonOnStep3
} from 'util/stepUtil';
const { ValidForm } = require('./../lib') as any;

interface OwnProps {
    annenForelder: AnnenForelder;
    utenlandsopphold: Utenlandsopphold;
    barn: FodtBarn & UfodtBarn;
    vedlegg: File[];
    activeStep: number;
    error: any;
    søknadSendt: boolean;
    søknadSendingInProgress: boolean;
}

type Props = OwnProps &
    DispatchProps &
    InjectedIntlProps &
    RouteComponentProps<{}>;

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
        const { activeStep } = this.props;
        return activeStep === 4;
    }

    handleNextClicked() {
        const {
            dispatch,
            annenForelder,
            barn,
            utenlandsopphold,
            vedlegg
        } = this.props;
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
        const {
            activeStep,
            annenForelder,
            utenlandsopphold,
            barn
        } = this.props;
        switch (activeStep) {
            case 1:
                return shouldDisplayNextButtonOnStep1(barn);
            case 2:
                return shouldDisplayNextButtonOnStep2(annenForelder);
            case 3:
                return shouldDisplayNextButtonOnStep3(barn, utenlandsopphold);
            case 4:
            default:
                return true;
        }
    }

    render() {
        const { intl, activeStep, søknadSendingInProgress } = this.props;
        const stepsConfig = getStepConfig(intl);
        const titles = stepsConfig.map(stepConf => stepConf.stegIndikatorLabel);
        const fortsettKnappLabel =
            stepsConfig[activeStep - 1].fortsettKnappLabel;

        return (
            <div>
                <Prompt
                    message={nextLocation => {
                        const { location } = this.props;
                        if (
                            location.pathname === nextLocation.pathname &&
                            nextLocation.hash !== location.hash
                        ) {
                            return true;
                        }
                        return 'Hvis du går ut av siden vil du miste all informasjonen som du har fylt ut i søknaden. Ønsker du å fortsette?';
                    }}
                />
                <Søknadstittel
                    tittel={getMessage(intl, 'søknad.pageheading')}
                />
                <ValidForm
                    summaryTitle="Du må rette opp i følgende feil:"
                    noSummary={activeStep === 3}
                    onSubmit={this.handleNextClicked}
                    className="responsiveContainer"
                >
                    <SkjemaHeader
                        onPrevious={() => this.handleBackClicked()}
                        activeStep={activeStep}
                        stepTitles={titles}
                    />

                    {activeStep === 1 && <Steg1 />}
                    {activeStep === 2 && <Steg2 />}
                    {activeStep === 3 && <Steg3 />}
                    {activeStep === 4 && <Steg4 />}

                    {this.shouldRenderFortsettKnapp() === true && (
                        <Hovedknapp
                            className="responsiveButton"
                            disabled={søknadSendingInProgress}
                            spinner={søknadSendingInProgress}
                        >
                            {fortsettKnappLabel}
                        </Hovedknapp>
                    )}
                </ValidForm>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
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
