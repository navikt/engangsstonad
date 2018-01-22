import React from 'react';
import { mount } from 'enzyme';
import { EngangsstonadIndex } from './Engangsstonad.index';

const routeArray = [
	{ path: '1', component: () => <p>testRoute1</p> },
	{ path: '2', component: () => <p>testRoute2</p> },
	{ path: '3', component: () => <p>testRoute2</p> }
];

describe('<EngangsstonadIndex />', () => {
	it('should render StepBasedForm', () => {
		const wrapper = mount(
			<EngangsstonadIndex
				routes={routeArray}
				data={{ fornavn: 'foo' }}
				match={{ path: 'foo' }}
				dispatch={() => {}}
				location={{ search: 'asdf', pathname: '/' }}
				title="title"
			/>
		);
		expect(wrapper.find('StepBasedForm'));
	});

	it('should render StepBasedFrom with correct number of routes', () => {
		const wrapper = mount(
			<EngangsstonadIndex
				routes={routeArray}
				data={{ fornavn: 'foo' }}
				match={{ path: 'foo' }}
				dispatch={() => {}}
				location={{ search: 'asdf' }}
				title="title"
			/>
		);
		const stepBasedForm = wrapper.find('StepBasedForm');
		expect(stepBasedForm.prop('routes')).to.have.length(3);
	});
});
