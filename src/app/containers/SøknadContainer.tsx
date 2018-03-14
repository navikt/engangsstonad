import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';

import getMessage from '../util/i18n/i18nUtils';
import StepIndicator from 'components/progress-indicator/StepIndicator';
import { Innholdstittel } from 'nav-frontend-typografi';

import Steg1 from './../connected-components//engangsstonad-steg/Steg1';
import Steg2 from '../connected-components/engangsstonad-steg/Steg2';
import Steg3 from '../connected-components/engangsstonad-steg/Steg3';
import Steg4 from '../connected-components/engangsstonad-steg/Steg4';

import getStepConfig from './../connected-components/engangsstonad-steg/steg.config';

import '../styles/engangsstonad.less';
import { EngangsstonadSoknadResponse } from '../types/services/EngangsstonadSoknadResponse';
import Utenlandsopphold from '../types/domain/Utenlandsopphold';
import { FodtBarn, UfodtBarn } from '../types/domain/Barn';
import AnnenForelder from '../types/domain/AnnenForelder';
import { apiActionCreators as api, stepActionCreators as stepActions } from 'actions';
import { DispatchProps } from '../redux/types';
const { ValidForm } = require('./../lib') as any;

interface OwnProps {
    soknadPostResponse: EngangsstonadSoknadResponse;
    annenForelder: AnnenForelder;
    utenlandsopphold: Utenlandsopphold;
    barn: FodtBarn & UfodtBarn;
    vedlegg: File[];
    activeStep: number;
}

type Props = OwnProps & DispatchProps & InjectedIntlProps & RouteComponentProps<{}>;

export class SøknadContainer extends React.Component<Props> {
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
        return activeStep === 4;
    }

    handleNextClicked() {
        const { dispatch, annenForelder, barn, utenlandsopphold, vedlegg } = this.props;
        if (this.hasToWaitForResponse()) {
            return dispatch(api.sendSoknad({ annenForelder, barn, utenlandsopphold, vedlegg }));
        }
        const { activeStep } = this.props;
        dispatch(stepActions.setActiveStep(activeStep + 1));
    }
    shouldRenderFortsettKnapp(): boolean {
        const { activeStep, annenForelder, utenlandsopphold, barn } = this.props;
        const fødselsdatoIsSet = (barn.fødselsdatoer && barn.fødselsdatoer.length > 0);
        if (activeStep === 1 && barn) {
            return barn.terminbekreftelseDato !== undefined || fødselsdatoIsSet;
        } else if (activeStep === 2 && annenForelder) {
            return annenForelder.fnr !== undefined || annenForelder.kanIkkeOppgis === true;
        } else if (activeStep === 3 && utenlandsopphold) {
            return utenlandsopphold.fødselINorge !== undefined || (fødselsdatoIsSet && utenlandsopphold.iNorgeNeste12Mnd !== undefined);
        }
        return activeStep === 4;
    }

    render() {
        const { intl, activeStep } = this.props;
        const stepsConfig = getStepConfig(intl);
        const titles = stepsConfig.map((stepConf) => stepConf.stegIndikatorLabel);
        const fortsettKnappLabel = stepsConfig[activeStep - 1].fortsettKnappLabel;

        return ([
            (
                <div className="engangsstonad__søknadstittel" key="title">
                    <Innholdstittel>{getMessage(intl, 'søknad.pageheading')}</Innholdstittel>
                </div>
            ),
            (
                <ValidForm
                    summaryTitle="Du må rette opp i følgende feil:"
                    noSummary={activeStep === 3}
                    onSubmit={this.handleNextClicked}
                    key="form"
                    className="centeredContent"
                >
                    <StepIndicator stepTitles={titles} activeStep={activeStep} />

                    {activeStep === 1 && <Steg1 />}
                    {activeStep === 2 && <Steg2 />}
                    {activeStep === 3 && <Steg3 />}
                    {activeStep === 4 && <Steg4 />}

                    {
                        this.shouldRenderFortsettKnapp() === true &&
                        <Hovedknapp className="fortsettKnapp">
                            {fortsettKnappLabel}
                        </Hovedknapp>
                    }
                </ValidForm>
            )
        ]);
    }
}

const mapStateToProps = (state: any) => ({
    utenlandsopphold: state.soknadReducer.utenlandsopphold,
    barn: state.soknadReducer.barn,
    vedlegg: state.soknadReducer.vedlegg,
    annenForelder: state.soknadReducer.annenForelder,
    soknadPostResponse: state.apiReducer.soknad,
    activeStep: state.stepReducer.activeStep
});
export default connect<OwnProps>(mapStateToProps)(injectIntl(SøknadContainer));
