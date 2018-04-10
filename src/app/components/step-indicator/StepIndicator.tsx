import * as React from 'react';
import Step from './Step';
import 'nav-frontend-stegindikator-style';
import './stepIndicator.less';
import { Innholdstittel } from 'nav-frontend-typografi';

interface Props {
    stepTitles: string[];
    activeStep: number;
}

const StepIndicator: React.StatelessComponent<Props> = ({ stepTitles, activeStep }) => (
    <div className="stegindikatorWrapper" role="progressbar" aria-valuenow={activeStep} aria-valuemin="1" aria-valuemax={stepTitles.length}>
        <div className="stegindikatortittel">
            <Innholdstittel>{stepTitles[activeStep - 1]}</Innholdstittel>
        </div>
        <ul className="stegindikator">{stepTitles.map((step, index) => <Step activeStep={activeStep} key={step} title={step} step={index + 1} />)}</ul>
    </div>
);

export default StepIndicator;
