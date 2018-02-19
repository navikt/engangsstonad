import * as React from 'react';
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Sidetittel } from 'nav-frontend-typografi';

import StepIndicator from 'shared/progress-indicator/StepIndicator';
import BackLink from 'shared/back-link/BackLink';
import EngangsstonadStep1 from 'components/engangsstonad/steps/EngangsstonadStep1';
import EngangsstonadStep2 from 'components/engangsstonad/steps/EngangsstonadStep2';
import EngangsstonadStep3 from 'components/engangsstonad/steps/EngangsstonadStep3';
import { ExternalProps } from '../../types';

import './engangsstonad.less';

interface OwnProps {
    activeStep: number;
    backLinks: string[];
}

type Props = InjectedIntlProps & ExternalProps & RouteComponentProps<{}>;
export class EngangsstonadContainer extends React.Component<Props, OwnProps> {
    constructor(props: Props) {
        super(props);
        this.state = {
            activeStep: parseInt(props.location.pathname.substr(-1), 10),
            backLinks: [
                '/engangsstonad/',
                '/engangsstonad/step1',
                '/engangsstonad/step2'
            ]
        };

        this.navigateToNextStep = this.navigateToNextStep.bind(this);
    }

    componentWillMount() {
        this.setState({
            activeStep: parseInt(this.props.location.pathname.substr(-1), 10)
        });
    }

    componentWillReceiveProps(newProps: Props) {
        this.setState({
            activeStep: parseInt(newProps.location.pathname.substr(-1), 10)
        });
    }

    navigateToNextStep() {
        this.props.history.push(this.state.backLinks[this.state.activeStep + 1]);
    }

    render() {
        const { intl } = this.props;
        const steps = [
            {
                title: intl.formatMessage({
                    id: 'relasjonBarn.sectionheading.relasjonBarn'
                }),
                label: '1'
            },
            {
                title: intl.formatMessage({
                    id: 'medlemmskap.sectionheading.medlemmskap'
                }),
                label: '2'
            },
            {
                title: intl.formatMessage({
                    id: 'oppsummering.sectionheading.oppsummering'
                }),
                label: '3'
            }
        ];

        return (
            <div className="engangsstonad">
                <Sidetittel>
                    {intl.formatMessage({ id: 'intro.pageheading.soknadES' })}
                </Sidetittel>
                <div className="linkIndicatorWrapper">
                <div className="linkIndicatorWrapper__link">
                <BackLink
                    href={this.state.backLinks[this.state.activeStep - 1]}
                    text={intl.formatMessage({ id: 'standard.button.gaTilbake' })}
                />

                </div>
                <StepIndicator
                    stepTitles={steps.map((step) => step.title)}
                    activeStep={this.state.activeStep}
                />
                </div>
                <Switch>
                    <Route path="/engangsstonad/step1" component={EngangsstonadStep1} />
                    <Route path="/engangsstonad/step2" component={EngangsstonadStep2} />
                    <Route path="/engangsstonad/step3" component={EngangsstonadStep3} />
                    <Redirect
                        to={this.state.backLinks[this.state.activeStep - 1]}
                    />
                </Switch>
            </div>
        );
    }
}
export default withRouter(injectIntl(EngangsstonadContainer));
