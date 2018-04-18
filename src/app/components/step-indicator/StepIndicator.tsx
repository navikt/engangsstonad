import * as React from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import 'nav-frontend-stegindikator-style';
import './stepIndicator.less';

interface Props {
    stepTitles: string[];
    activeStep: number;
}

class StepIndicator extends React.Component<Props> {
    title: HTMLElement | null;
    componentDidMount() {
        if (this.title != null) {
            this.title.focus();
        }
    }
    componentDidUpdate(prevProps: Props) {
        if (this.title != null && prevProps.activeStep !== this.props.activeStep) {
            this.title.focus();
        }
    }
    render() {
        const { activeStep, stepTitles } = this.props;
        return (
            <div className="stepindicator" role="progressbar" aria-valuenow={activeStep} aria-valuemin="1" aria-valuemax={stepTitles.length}>
                <h1 className="typo-systemtittel stepindicator__title">
                    <span className="m_no-focusOutline" ref={c => (this.title = c)} tabIndex={-1}>
                        {stepTitles[activeStep - 1]}
                    </span>
                </h1>
                <Stegindikator
                    visLabel={false}
                    kompakt={true}
                    autoResponsiv={true}
                    aktivtSteg={activeStep - 1}
                    steg={stepTitles.map((s, i) => ({
                        index: i + 1,
                        label: stepTitles[i]
                    }))}
                />
            </div>
        );
    }
}

export default StepIndicator;
