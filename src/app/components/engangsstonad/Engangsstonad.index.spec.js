import React from 'react';
import { EngangsstonadIndex } from './Engangsstonad.index';

const routeArray = [
	{ path: '1', component: () => <p>testRoute1</p> },
	{ path: '2', component: () => <p>testRoute2</p> },
	{ path: '3', component: () => <p>testRoute2</p> }
];

describe('<EngangsstonadIndex />', () => {
	it('should render StepBasedForm', () => {
		const wrapper = shallow(
			<EngangsstonadIndex
				routes={routeArray}
				match={{ path: 'foo' }}
				dispatch={() => {}}
			/>
		);
		expect(wrapper.find('StepBasedForm'));
	});

	it('should render StepBasedFrom with correct number of routes', () => {
		const wrapper = shallow(
			<EngangsstonadIndex
				routes={routeArray}
				match={{ path: 'foo' }}
				dispatch={() => {}}
			/>
		);
		const stepBasedForm = wrapper.find('StepBasedForm');
		expect(stepBasedForm.prop('routes')).to.have.length(3);
	});
});
