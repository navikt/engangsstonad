import * as React from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import 'nav-frontend-stegindikator-style';
import './stepIndicator.less';

interface Props {
    stepTitles: string[];
    activeStep: number;
    refCallback: (title: any) => any;
}

class StepIndicator extends React.Component<Props> {
    render() {
        const { activeStep, stepTitles, refCallback } = this.props;
        return (
            <div>
                <div
                    className="stegindikatorWrapper"
                    role="progressbar"
                    aria-valuenow={activeStep}
                    aria-valuemin="1"
                    aria-valuemax={stepTitles.length}
                >
                    <div className="stegTittelWrapper">
                        <h2 className="stegTittel" tabIndex={0} ref={title => refCallback(title)}>
                            {stepTitles[activeStep - 1]}
                        </h2>
                    </div>
                    <ul>
                        <Stegindikator
                            visLabel={false}
                            kompakt={true}
                            autoResponsiv={true}
                            aktivtSteg={activeStep - 1}
                            steg={[
                                {
                                    index: 1,
                                    label: stepTitles[0]
                                },
                                {
                                    index: 2,
                                    label: stepTitles[1]
                                },
                                {
                                    index: 3,
                                    label: stepTitles[2]
                                },
                                {
                                    index: 4,
                                    label: stepTitles[3]
                                }
                            ]}
                        />
                    </ul>
                </div>
            </div>
        );
    }
}

export default StepIndicator;
