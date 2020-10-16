import React, { useEffect } from 'react';
import Stegindikator from 'nav-frontend-stegindikator';

import './stepIndicator.less';

interface Props {
    stepTitles: string[];
    activeStep: number;
}

const StepIndicator: React.FunctionComponent<Props> = ({ activeStep, stepTitles }) => {
    let title: HTMLElement | null;

    useEffect(() => {
        if (title != null) {
            title.focus();
        }
    }, []);

    useEffect(() => {
        if (title != null && activeStep !== activeStep) {
            title.focus();
        }
    });

    return (
        <div
            className="stepindicator"
            role="progressbar"
            aria-valuenow={activeStep}
            aria-valuemin={1}
            aria-valuemax={stepTitles.length}
        >
            <h1 className="typo-systemtittel stepindicator__title">
                <span className="m_no-focusOutline" ref={(c) => (title = c)} tabIndex={-1}>
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
                    label: stepTitles[i],
                }))}
            />
        </div>
    );
};
export default StepIndicator;
