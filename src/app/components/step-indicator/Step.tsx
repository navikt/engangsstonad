import * as React from 'react';
import * as classnames from 'classnames';

const Ikon = require('nav-frontend-ikoner-assets').default;

interface Props {
    step: number;
    activeStep: number;
    title: string | JSX.Element;
}

const Step: React.StatelessComponent<Props> = ({ step, activeStep, title }) => {
    const passed = step < activeStep;

    return (
        <li
            aria-label={title}
            className={classnames('stegindikator__steg', {
                'stegindikator__steg--inaktiv': step > activeStep,
                'stegindikator__steg--aktiv': step === activeStep
            })}
        >
            {passed ? <Ikon kind="ok-sirkel-fylt" /> : <span>{step}</span>}
        </li>
    );
};

export default Step;
