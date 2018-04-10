import * as React from 'react';
import BackButton from 'components/back-button/BackButton';
import StepIndicator from 'components/step-indicator/StepIndicator';

import './skjemaHeader.less';

export interface Props {
    onPrevious: () => void;
    activeStep: number;
    stepTitles: string[];
}

const SkjemaHeader: React.StatelessComponent<Props> = ({ activeStep, onPrevious, stepTitles }) => (
    <div className="skjemaHeader">
        <div className="skjemaHeader__backButton">
            <BackButton onClick={() => onPrevious()} hidden={activeStep === 1} />
        </div>
        <div className="skjemaHeader__steps">
            <StepIndicator stepTitles={stepTitles} activeStep={activeStep} />
        </div>
    </div>
);

export default SkjemaHeader;
