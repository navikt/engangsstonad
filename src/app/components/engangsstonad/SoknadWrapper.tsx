import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';

import getMessage from '../../util/i18n/i18nUtils';
import StepIndicator from 'shared/progress-indicator/StepIndicator';
import { Sidetittel } from 'nav-frontend-typografi';

import EngangsstonadStep1 from 'components/engangsstonad/steps/EngangsstonadStep1';
import EngangsstonadStep2 from 'components/engangsstonad/steps/EngangsstonadStep2';
import EngangsstonadStep3 from 'components/engangsstonad/steps/EngangsstonadStep3';

import './engangsstonad.less';
import { EngangsstonadSoknadResponse } from '../../types/services/EngangsstonadSoknadResponse';
import Medlemsskap from '../../types/domain/Medlemsskap';
import { RelasjonTilFodtBarn, RelasjonTilUfodtBarn } from '../../types/domain/RelasjonTilBarn';
import { apiActionCreators as api, stepActionCreators as stepActions } from 'actions';
import { DispatchProps } from '../../redux/types';
import getStepConfig from './steps/steps.conf';

import { ValidForm } from './../../lib';

interface OwnProps {
    soknadPostResponse: EngangsstonadSoknadResponse;
    medlemsskap: Medlemsskap;
    relasjonTilBarn: RelasjonTilFodtBarn & RelasjonTilUfodtBarn;
    activeStep: number;
}

type Props = OwnProps & DispatchProps & InjectedIntlProps & History & RouteComponentProps<{}>;

export class SoknadWrapper extends React.Component<Props> {
    componentWillMount() {
        this.handleNextClicked = this.handleNextClicked.bind(this);
    }

    componentWillReceiveProps(props: OwnProps) {
        if (props.soknadPostResponse) {
            const { history } = this.props;
            history.push('/engangsstonad/completed');
        }
    }

    hasToWaitForResponse() {
        const { activeStep } = this.props;
        return activeStep === 3;
    }

    handleNextClicked() {
        const { dispatch, medlemsskap, relasjonTilBarn } = this.props;
        if (this.hasToWaitForResponse()) {
            return dispatch(api.sendSoknad({ medlemsskap, relasjonTilBarn }));
        }
        const { activeStep } = this.props;
        dispatch(stepActions.setActiveStep(activeStep + 1));
    }

    shouldRenderFortsettKnapp(): boolean {
        const { activeStep, medlemsskap, relasjonTilBarn } = this.props;
        if (activeStep === 1 && relasjonTilBarn) {
            return relasjonTilBarn.utstedtDato !== undefined || relasjonTilBarn.fodselsdato !== undefined;
        } else if (activeStep === 2 && medlemsskap) {
            return medlemsskap.fodselINorge !== undefined;
        }
        return activeStep === 3;
    }

    render() {
        const { intl, activeStep } = this.props;
        const stepsConfig = getStepConfig(intl);
        const titles = stepsConfig.map((stepConf) => stepConf.stegIndikatorLabel);
        const fortsettKnappLabel = stepsConfig[activeStep - 1].fortsettKnappLabel;
        let ValidFormComponent = ValidForm as any;

        return (
            <div className="engangsstonad">
                <ValidFormComponent summaryTitle="Du må rette opp i følgende feil:" onSubmit={this.handleNextClicked}>
                    <Sidetittel className="centerText">{getMessage(intl, 'intro.pageheading.soknadES')}</Sidetittel>
                    <StepIndicator stepTitles={titles} activeStep={activeStep} />

                    {activeStep === 1 && <EngangsstonadStep1 />}
                    {activeStep === 2 && <EngangsstonadStep2 />}
                    {activeStep === 3 && <EngangsstonadStep3 />}

                    {
                        this.shouldRenderFortsettKnapp() === true &&
                        <Hovedknapp className="fortsettKnapp">
                            {fortsettKnappLabel}
                        </Hovedknapp>
                    }
                </ValidFormComponent>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    medlemsskap: state.soknadReducer.medlemsskap,
    relasjonTilBarn: state.soknadReducer.relasjonTilBarn,
    soknadPostResponse: state.apiReducer.soknad,
    activeStep: state.stepReducer.activeStep
});

export default connect<OwnProps>(mapStateToProps)(injectIntl(SoknadWrapper));