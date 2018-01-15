import React from 'react';
import { Stepper } from './Stepper';

describe('<Stepper />', () => {
	it('should render StepperButton ', () => {
		const wrapper = shallow(<Stepper />);
		expect(wrapper.find('StepperButton'));
	});

	it('should render StepperButton with step ahead properties', () => {
		const wrapper = shallow(<Stepper nextRoute="/" showStepAhead />);
		const stepperButton = wrapper.find('StepperButton');
		expect(stepperButton.props()).to.have.property(
			'label',
			'Fortsett med søknad'
		);
		expect(stepperButton.props()).to.have.property('href', '/');
	});

	it('should render StepperButton with submission properties', () => {
		const wrapper = shallow(<Stepper nextRoute="/" showSubmission />);
		const stepperButton = wrapper.find('StepperButton');
		expect(stepperButton.props()).to.have.property(
			'label',
			'Lukk dette vinduet'
		);
		expect(stepperButton.props()).to.have.property('href', '/');
	});
});
