import * as React from 'react';
import Step from './Step';
const { Ingress } = require('nav-frontend-typografi');
import 'nav-frontend-stegindikator-style';
import './stepIndicator.less';

interface Props {
    stepTitles: string[];
    activeStep: number;
}

const StepIndicator: React.StatelessComponent<Props> = ({ stepTitles, activeStep }) => (
    <div
        className="stegindikatorWrapper"
        role="progressbar"
        aria-valuenow={activeStep}
        aria-valuemin="1"
        aria-valuemax={stepTitles.length}
    >
        <div className="stegindikatortittel">
            <Ingress>{stepTitles[activeStep - 1]}</Ingress>
        </div>
        <ul className="stegindikator">
            {stepTitles.map((step, index) => (
                <Step
                    activeStep={activeStep}
                    key={step}
                    title={step}
                    step={index + 1}
                />
            ))}
        </ul>
    </div>
);

export default StepIndicator;
