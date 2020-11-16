import React from 'react';
import { RouteComponentProps, Prompt } from 'react-router';
import { useIntl } from 'react-intl';
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
import { Språkkode } from 'intl/types';

import '../styles/engangsstonad.less';

interface OwnProps {
    søknad: EngangsstonadSoknad;
    språkkode: Språkkode;
    person: Person;
    activeStep: number;
    søknadSendt: boolean;
    søknadSendingInProgress: boolean;
    sessionHasExpired: boolean;
}

type Props = OwnProps & DispatchProps & RouteComponentProps;

const SøknadContainer: React.FunctionComponent<Props> = ({
    søknad,
    språkkode,
    person,
    activeStep,
    søknadSendingInProgress,
    sessionHasExpired,
    dispatch,
}) => {
    const intl = useIntl();
    const stepsConfig = getStepConfig(intl, person);
    const titles = stepsConfig.map((stepConf) => stepConf.stegIndikatorLabel);
    const fortsettKnappLabel = stepsConfig[activeStep - 1].fortsettKnappLabel;
    const ActiveStep = stepsConfig[activeStep - 1].component;

    const hasToWaitForResponse = () => {
        const config = getStepConfig(intl, person);
        return activeStep === config.length;
    };

    const handleNextClicked = () => {
        if (hasToWaitForResponse()) {
            return dispatch(api.sendSoknad(søknad, språkkode));
        }
        dispatch(stepActions.setActiveStep(activeStep + 1));
    };

    const handleBackClicked = () => {
        if (activeStep > 1) {
            dispatch(stepActions.setActiveStep(activeStep - 1));
        }
    };

    const shouldRenderFortsettKnapp = (): boolean => {
        const stepConfig = getStepConfig(intl, person);
        return stepConfig[activeStep - 1].nextStepCondition({ ...søknad });
    };

    return (
        <>
            <Prompt message={() => getMessage(intl, 'søknadContainer.prompt')} />
            <Søknadstittel tittel={getMessage(intl, 'søknad.pageheading')} />
            <ValidForm
                summaryTitle={getMessage(intl, 'validForm.summaryTitle')}
                noSummary={activeStep === stepsConfig.length - 1}
                onSubmit={handleNextClicked}
                className="responsiveContainer"
            >
                <SkjemaHeader onPrevious={() => handleBackClicked()} activeStep={activeStep} stepTitles={titles} />

                <ActiveStep />

                {shouldRenderFortsettKnapp() && (
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
};

const mapStateToProps = (state: AppState) => ({
    søknad: state.soknadReducer,
    språkkode: state.commonReducer.språkkode,
    person: state.apiReducer.person!,
    activeStep: state.stepReducer.activeStep,
    søknadSendt: state.apiReducer.søknadSendt,
    søknadSendingInProgress: state.apiReducer.søknadSendingInProgress,
    sessionHasExpired: state.apiReducer.sessionHasExpired,
});
export default connect<OwnProps>(mapStateToProps)(SøknadContainer);
