import * as React from 'react';
import { RouteComponentProps, Prompt } from 'react-router';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';

import getMessage from '../util/i18n/i18nUtils';
import StepIndicator from 'components/step-indicator/StepIndicator';

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
import Søknadstittel from 'components/søknadstittel/Søknadstittel';
import BackButton from 'components/back-button/BackButton';
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
        this.handleBackClicked = this.handleBackClicked.bind(this);
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

    handleBackClicked() {
        const { dispatch, activeStep } = this.props;
        if (activeStep > 1) {
            dispatch(stepActions.setActiveStep(activeStep - 1));
        }
    }

    shouldRenderFortsettKnapp(): boolean {
        const { activeStep, annenForelder, utenlandsopphold, barn } = this.props;
        const fødselsdatoIsSet = (barn.fødselsdatoer && barn.fødselsdatoer.length > 0);
        if (activeStep === 1 && barn) {
            return barn.terminbekreftelseDato !== undefined || fødselsdatoIsSet;
        } else if (activeStep === 2 && annenForelder) {
            return annenForelder.kanIkkeOppgis === true 
                    || annenForelder.fnr !== undefined 
                    || (annenForelder.utenlandskFnr === true && annenForelder.bostedsland !== undefined && annenForelder.bostedsland.length > 0 );
        } else if (activeStep === 3 && utenlandsopphold) {
            if (utenlandsopphold.iNorgeNeste12Mnd === false) {
                return utenlandsopphold.senerePerioder.length > 0 && (fødselsdatoIsSet || utenlandsopphold.fødselINorge !== undefined);
            }
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
                <Prompt
                    message="Hvis du går ut av siden vil du miste all informasjonen som du har fylt ut i søknaden. Ønsker du å fortsette?"
                    key="prompt"
                />
            ),
            (<Søknadstittel tittel={getMessage(intl, 'søknad.pageheading')} key="tittel" />),
            (
                <ValidForm
                    summaryTitle="Du må rette opp i følgende feil:"
                    noSummary={activeStep === 3}
                    onSubmit={this.handleNextClicked}
                    key="form"
                    className="responsiveContainer"
                >
                    <BackButton onClick={this.handleBackClicked} hidden={activeStep === 1} />
                    <StepIndicator stepTitles={titles} activeStep={activeStep} />

                    {activeStep === 1 && <Steg1 />}
                    {activeStep === 2 && <Steg2 />}
                    {activeStep === 3 && <Steg3 />}
                    {activeStep === 4 && <Steg4 />}

                    {
                        this.shouldRenderFortsettKnapp() === true &&
                        <Hovedknapp className="responsiveButton">
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
