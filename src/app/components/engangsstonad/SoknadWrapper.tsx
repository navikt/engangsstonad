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
import { apiActionCreators as api } from 'actions';
import { DispatchProps } from '../../redux/types';

interface OwnProps {
    soknadPostResponse: EngangsstonadSoknadResponse;
    medlemsskap: Medlemsskap;
    relasjonTilBarn: RelasjonTilFodtBarn & RelasjonTilUfodtBarn;
}

type Props = OwnProps & DispatchProps & InjectedIntlProps & History & RouteComponentProps<{}>;

interface State {
    activeStep: number;
}

export class SoknadWrapper extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { activeStep: 1 };
    }

    componentWillReceiveProps(props: OwnProps) {
        if (props.soknadPostResponse) {
            const { history } = this.props;
            history.push('/engangsstonad/completed');
        }
    }

    formIsValid() {
        return true;
    }

    hasToWaitForResponse() {
        const { activeStep } = this.state;
        return activeStep === 3;
    }

    handleNextClicked() {
        if (this.hasToWaitForResponse()) {
            const { dispatch, medlemsskap, relasjonTilBarn } = this.props;
            return dispatch(api.sendSoknad({ medlemsskap, relasjonTilBarn }));
        }

        if (this.formIsValid()) {
            const { activeStep } = this.state;
            this.setState({ activeStep: activeStep + 1 });
        }
    }

    render() {
        const { intl } = this.props;
        const { activeStep } = this.state;

        return (
            <div className="engangsstonad">
                <Sidetittel>{getMessage(intl, 'intro.pageheading.soknadES')}</Sidetittel>
                <StepIndicator
                    stepTitles={[
                        getMessage(intl, 'relasjonBarn.sectionheading.relasjonBarn'),
                        getMessage(intl, 'medlemmskap.sectionheading.medlemmskap'),
                        getMessage(intl, 'oppsummering.sectionheading.oppsummering')

                    ]}
                    activeStep={this.state.activeStep}
                />

                {activeStep === 1 && <EngangsstonadStep1 />}
                {activeStep === 2 && <EngangsstonadStep2 />}
                {activeStep === 3 && <EngangsstonadStep3 />}

                <Hovedknapp className="fortsettKnapp" onClick={() => this.handleNextClicked()}>
                    Fortsett
                </Hovedknapp>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    medlemsskap: state.soknadReducer.medlemsskap,
    relasjonTilBarn: state.soknadReducer.relasjonTilBarn,
    soknadPostResponse: state.apiReducer.soknad
});

export default connect<OwnProps>(mapStateToProps)(injectIntl(SoknadWrapper));
