import React from 'react';
import { Switch, Route } from 'react-router-dom';

import BackLink from 'shared/back-link/BackLink';

import Step2 from './steps/Engangsstonad.step2';
import Step3 from './steps/Engangsstonad.step3';
import Step4 from './steps/Engangsstonad.step4';

import './engangsstonad.less';

export const EngangsstonadIndex = () => (
	<div className="engangsstonad">
		<BackLink href="/engangsstonad" />
		<Switch>
			<Route path="/engangsstonad/step1" component={Step2} />
			<Route path="/engangsstonad/step2" component={Step3} />
			<Route path="/engangsstonad/step3" component={Step4} />
		</Switch>
	</div>
);

export default EngangsstonadIndex;
