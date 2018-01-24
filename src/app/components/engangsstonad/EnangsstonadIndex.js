import React from 'react';
import { Switch, Route } from 'react-router-dom';

import StepIndicator from 'shared/progress-indicator/StepIndicator';
import BackLink from 'shared/back-link/BackLink';
import Header from 'shared/header/Header';
import Step2 from './steps/Engangsstonad.step2';
import Step3 from './steps/Engangsstonad.step3';
import Step4 from './steps/Engangsstonad.step4';

import './engangsstonad.less';

const steps = [
	{
		title: 'Relasjon til barn',
		label: '1'
	},
	{
		title: 'Tilknytning til Norge',
		label: '2'
	},
	{
		title: 'Oppsummering',
		label: '3'
	}
];

export const EngangsstonadIndex = () => (
	<div className="engangsstonad">
		<Header title="Søknad om engangsstønad" />
		<div className="linkIndicatorWrapper">
			<div className="linkIndicatorWrapper__link">
				<BackLink to="/engangsstonad" />
			</div>
			<StepIndicator steps={steps} activeStep={1} />
		</div>
		<Switch>
			<Route path="/engangsstonad/step1" component={Step2} />
			<Route path="/engangsstonad/step2" component={Step3} />
			<Route path="/engangsstonad/step3" component={Step4} />
		</Switch>
	</div>
);

export default EngangsstonadIndex;
